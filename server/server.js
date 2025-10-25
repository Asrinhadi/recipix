import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ 
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: "5mb" }));

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY mangler i .env");
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY mangler i .env");
  process.exit(1);
}

if (!process.env.SPOONACULAR_API_KEY) {
  console.error("SPOONACULAR_API_KEY mangler i .env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/api/find-recipes", async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!ingredients || ingredients.trim() === "") {
      return res.status(400).json({ error: "Ingredienser er påkrevd" });
    }

    console.log(`Søker etter oppskrifter med ingredienser: ${ingredients}`);

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${encodeURIComponent(ingredients)}&number=6&ranking=2`;

    const response = await axios.get(url);
    const recipes = response.data;

    console.log(`Fant ${recipes.length} oppskrifter`);

    res.json({ recipes });

  } catch (err) {
    console.error("Feil ved henting av oppskrifter:", err.message);
    res.status(500).json({ 
      error: "Kunne ikke hente oppskrifter",
      details: err.message 
    });
  }
});

app.post("/api/recipe-details", async (req, res) => {
  try {
    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ error: "Recipe ID er påkrevd" });
    }

    console.log(`Henter detaljer for oppskrift ID: ${recipeId}`);

    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    const response = await axios.get(url);
    const details = response.data;

    console.log(`Hentet detaljer for: ${details.title}`);

    res.json({ details });

  } catch (err) {
    console.error("Feil ved henting av oppskriftsdetaljer:", err.message);
    res.status(500).json({ 
      error: "Kunne ikke hente oppskriftsdetaljer",
      details: err.message 
    });
  }
});

app.post("/api/generate-recipe-description", async (req, res) => {
  try {
    const { ingredients, recipeName } = req.body;

    console.log(`Genererer beskrivelse for oppskrift: ${recipeName || 'ukjent'}`);

    const systemPrompt = "Du er en kreativ matlagingsassistent som gir inspirerende beskrivelser av matretter på norsk. Hold det kort og appetittvekkende, 2-3 setninger.";
    
    const userPrompt = recipeName 
      ? `Lag en kort, appetittvekkende beskrivelse av matretten "${recipeName}" basert på disse ingrediensene: ${ingredients}`
      : `Lag en kort, appetittvekkende beskrivelse av en matrett basert på disse ingrediensene: ${ingredients}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.85,
      max_tokens: 200
    });

    const text = completion.choices?.[0]?.message?.content?.trim() || "";
    
    if (!text) {
      return res.status(500).json({ error: "Fikk ingen tekst fra AI" });
    }

    console.log(`Genererte ${text.length} tegn`);
    
    res.json({ text });

  } catch (err) {
    console.error("Feil ved tekstgenerering:", err.message);
    res.status(500).json({ 
      error: "AI kunne ikke generere beskrivelse", 
      details: err.message 
    });
  }
});

app.post("/api/generate-recipe-image", async (req, res) => {
  try {
    const { recipeName, ingredients } = req.body;

    const prompt = recipeName
      ? `Professional food photography of ${recipeName}, beautifully plated dish, restaurant quality, natural lighting, appetizing, high quality, detailed, vibrant colors`
      : `Professional food photography of a dish made with ${ingredients}, beautifully plated, restaurant quality, natural lighting, appetizing`;

    console.log("Genererer bilde med Gemini Imagen...");

    const model = genAI.getGenerativeModel({ 
      model: "imagen-3.0-generate-001" 
    });

    const result = await model.generateImages({
      prompt: prompt,
      numberOfImages: 1,
      aspectRatio: "1:1",
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    });

    if (!result || !result.images || result.images.length === 0) {
      throw new Error("Ingen bilder returnert fra Gemini Imagen");
    }

    const image = result.images[0];
    
    let imageUrl;
    
    if (image.imageBytes) {
      imageUrl = `data:image/png;base64,${image.imageBytes}`;
    } else if (image.mimeType && image.data) {
      imageUrl = `data:${image.mimeType};base64,${image.data}`;
    } else {
      throw new Error("Ukjent bildeformat fra Gemini");
    }
    
    console.log("Bilde generert med Gemini!");
    res.json({ url: imageUrl });

  } catch (err) {
    console.error("Feil ved bildegenerering med Gemini:", err.message);
    
    try {
      console.log("Prøver DALL-E som fallback...");
      
      const { recipeName, ingredients } = req.body;

      const prompt = recipeName
        ? `Professional food photography of ${recipeName}, beautifully plated dish, restaurant quality, natural lighting`
        : `Professional food photography of a dish made with ${ingredients}, beautifully plated`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        style: "vivid"
      });

      const imageUrl = response.data[0]?.url;
      
      if (!imageUrl) {
        throw new Error("Ingen URL fra DALL-E");
      }

      console.log("Bilde generert med DALL-E fallback!");
      res.json({ url: imageUrl });

    } catch (fallbackErr) {
      console.error("Også DALL-E feilet:", fallbackErr.message);
      res.status(500).json({ 
        error: "Kunne ikke generere bilde med verken Gemini eller DALL-E", 
        details: `Gemini: ${err.message}, DALL-E: ${fallbackErr.message}`
      });
    }
  }
});

app.post("/api/transcribe-audio", async (req, res) => {
  try {
    const { audioBase64 } = req.body;
    
    const base64Data = audioBase64.split(',')[1];
    const audioBuffer = Buffer.from(base64Data, 'base64');
    
    const file = new File([audioBuffer], "audio.webm", { type: "audio/webm" });
    
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "no"
    });

    console.log(`Transkriberte: "${transcription.text}"`);
    
    res.json({ text: transcription.text });

  } catch (err) {
    console.error("Feil ved transkripsjon:", err.message);
    res.status(500).json({ 
      error: "Kunne ikke transkribere lyd",
      details: err.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server kjører på http://localhost:${port}`);
  console.log(`✅ Gemini Imagen aktivert for bildegenerering`);
  console.log(`✅ OpenAI Whisper aktivert for tale-til-tekst`);
  console.log(`✅ GPT-4o-mini aktivert for tekstgenerering`);
  console.log(`✅ Spoonacular API aktivert for oppskrifter`);
});