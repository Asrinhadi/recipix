# Recipix – AI-drevet Oppskriftsgenerator

 En AI-drevet oppskriftsgenerator som hjelper brukere å finne matretter basert på ingrediensene de allerede har hjemme.  
 Støtter både tekst- og tale-input, genererer norske oppskriftsbeskrivelser og skaper realistiske matbilder ved hjelp av kunstig intelligens.

[![Build Status](https://img.shields.io/badge/status-active-brightgreen)]() [![PWA Ready](https://img.shields.io/badge/PWA-ready-blueviolet)]()

---

## Install

```bash
git clone https://github.com/dittbrukernavn/recipix.git
cd recipix/frontend
npm install
npm run dev
```

**Starter backend separat:**

```bash
cd ../server
npm install
npm start
```

---

## Getting Started

Recipix er en moderne PWA-klar webapplikasjon laget med React, Vite og Express. Den kombinerer kraftige AI-verktøy med en responsiv og brukervennlig frontend.

🔗 **Lenker og ressurser:**
- [Funksjoner i appen](#funksjoner-i-appen)
- [Teknologier brukt](#teknologier-brukt)
- [API-integrasjoner](#ai-verktøy-og-api-er)
- [Miljøvariabler](#miljøvariabler-env)
- [Lagring](#databaser-og-lagring)
- [Sikkerhet](#sikkerhetsnotater)

---

## Usage

### Quick Setup (Frontend)

```bash
cd recipix/frontend
npm install
npm run dev
```

Appen vil være tilgjengelig på `http://localhost:5173`.

### Backend

```bash
cd recipix/server
touch .env
npm install
npm start
```

---

## Teknologier Brukt

### Frontend

| Teknologi         | Versjon    | Brukt til                                  |
|------------------|------------|--------------------------------------------|
| React            | 18.2.0     | UI-komponenter                             |
| Vite             | 5.0.8      | Byggeverktøy / Dev-server                  |
| React Router DOM | 6.20.1     | Navigasjon mellom sider                    |
| Bootstrap        | 5.3.2      | Layout, styling, UI-elementer              |
| Spline           | 1.9.28     | 3D-bakgrunn (interaktiv robot)             |

### Backend

| Teknologi | Versjon  | Brukt til                            |
|----------|----------|--------------------------------------|
| Node.js  | 22.20.0  | Runtime for server                   |
| Express  | 4.21.2   | Ruting og API-håndtering             |
| Axios    | 1.x      | HTTP-kall til Spoonacular + AI-tjenester |
| Dotenv   | 16.4.7   | Miljøvariabler (.env)                |
| CORS     | 2.8.5    | Cross-Origin konfigurasjon           |

---

## Miljøvariabler (.env)

Lagt disse inn i `/server/.env`.

```env
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
SPOONACULAR_API_KEY=your_spoonacular_key
```

---

## AI-verktøy og API-er

| Tjeneste        | Brukt til                               | Modell        |
|-----------------|------------------------------------------|---------------|
| OpenAI GPT-4o   | Generere matbeskrivelser                 | gpt-4o-mini   |
| OpenAI Whisper  | Tale → tekst (speech-to-text)           | whisper-1     |
| DALL·E 3        | Fallback for bildegenerering             | dall-e-3      |
| Gemini Imagen   | Generere realistiske matbilder          | imagen-3.0    |
| Spoonacular API | Søke oppskrifter basert på ingredienser | -             |
| Claude          | Hoved utvikler                          | -             |
| GitHub Copilot  | Kodeforbedring                          | -             |

---

## Funksjoner i Appen

-  **Ingrediens-søk** – Bruker kan skrive inn ingredienser og få relevante oppskrifter
-  **Tale-til-tekst** – Bruker kan snakke inn ingrediensene
-  **AI-generert tekst** – GPT lager appetittvekkende beskrivelser
-  **AI-generert bilde** – Gemini/DALL·E genererer matbilder
-  **Lagre favoritter** – Oppskrifter lagres i localStorage
-  **Offline support** – Appen fungerer selv uten internett
-  **Responsiv layout** – Støtter mobil, nettbrett og desktop
-  **Glassmorfisme UI** – Moderne gjennomsiktige kort
-  **Spline 3D-bakgrunn** – Interaktiv robot i bakgrunnen

---

## Databaser og Lagring

- Ingen backend database (MongoDB, Firebase, osv.)
- All data lagres lokalt i nettleseren via `localStorage`
- Nøkkel: `recipix_saved_recipes`
- Format: JSON array med oppskrifter

---

## Sikkerhetsnotater

- Bruker `.gitignore` i `/server/`:

```gitignore
.env
node_modules/
```

- Alle API-nøkler håndteres i backend


---

## Contributing

1. Fork prosjektet
2. Lag en ny branch: `git checkout -b feature-navn`
3. Installer med `npm install`
4. Kjør lokalt:
   - Frontend: `npm run dev`
   - Backend: `npm start`
5. Lag en pull request 🎉

---

## License

- MIT License © 2025 Recipix Project
- Oppskriftsdata © Spoonacular API
- Bilder generert av OpenAI og Google Gemini

---

## Got Feedback?

Still spørsmål på GitHub Discussions eller [opprett en issue](https://github.com/asrinhadi/recipix/issues)