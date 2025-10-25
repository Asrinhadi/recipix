import { useState } from 'react';
import VoiceInput from './VoiceInput';
import { saveRecipe } from '../services/localStorage';

function FindRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [useVoice, setUseVoice] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [aiImage, setAiImage] = useState('');
  const [saved, setSaved] = useState(false);

  const handleVoiceTranscription = (text) => {
    setVoiceText(text);
    setIngredients(text);
    console.log("Mottok tale:", text);
  };

  const handleSearch = async () => {
    const searchIngredients = useVoice ? voiceText : ingredients;

    if (!searchIngredients || searchIngredients.trim() === '') {
      setError('Skriv inn ingredienser eller bruk taleinnspilling');
      return;
    }

    setLoading(true);
    setError('');
    setRecipes([]);
    setSelectedRecipe(null);
    setAiDescription('');
    setAiImage('');
    setSaved(false);

    console.log("Søker etter oppskrifter med:", searchIngredients);

    try {
      const response = await fetch('http://localhost:3001/api/find-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: searchIngredients })
      });

      const data = await response.json();

      if (data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes);
        console.log(`Fant ${data.recipes.length} oppskrifter`);
      } else {
        setError('Ingen oppskrifter funnet med disse ingrediensene');
      }

    } catch (err) {
      console.error('Feil ved søk:', err);
      setError('Kunne ikke søke etter oppskrifter. Sjekk at serveren kjører på port 3001');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async (recipe) => {
    setGeneratingAI(true);
    setAiDescription('');
    setAiImage('');
    setSelectedRecipe(recipe);
    setSaved(false);

    console.log("Genererer AI-innhold for:", recipe.title);

    try {
      const descResponse = await fetch('http://localhost:3001/api/generate-recipe-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ingredients: ingredients,
          recipeName: recipe.title 
        })
      });

      const descData = await descResponse.json();
      setAiDescription(descData.text || '');
      console.log("Beskrivelse generert");

      const imageResponse = await fetch('http://localhost:3001/api/generate-recipe-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          recipeName: recipe.title,
          ingredients: ingredients
        })
      });

      const imageData = await imageResponse.json();
      setAiImage(imageData.url || '');
      console.log("Bilde generert");

    } catch (err) {
      console.error('Feil ved AI-generering:', err);
      setError('Kunne ikke generere AI-innhold');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSave = () => {
    if (!selectedRecipe || !aiImage || saved) return;

    const recipeToSave = {
      id: selectedRecipe.id,
      title: selectedRecipe.title,
      image: aiImage,
      originalImage: selectedRecipe.image,
      description: aiDescription,
      usedIngredients: selectedRecipe.usedIngredients,
      missedIngredients: selectedRecipe.missedIngredients,
      searchIngredients: ingredients
    };

    const result = saveRecipe(recipeToSave);
    if (result) {
      setSaved(true);
      console.log("Oppskrift lagret");
    } else {
      setError('Kunne ikke lagre oppskriften');
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: '85vh', paddingTop: '1rem' }}>
      
      <div className="row w-100" style={{ margin: '0 auto', maxWidth: '1400px' }}>
        <div className="col-md-6"></div>
        
        <div className="col-md-6 d-flex flex-column align-items-end" style={{ padding: '1rem 3rem 2rem 2rem' }}>
          
          <h1 
            className="mb-4" 
            style={{ 
              color: '#ffffff', 
              fontSize: '2.5rem', 
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
            }}
          >
            Finn oppskrifter
          </h1>

          <div className="text-center mb-4" style={{ width: '100%', maxWidth: '520px' }}>
            <button 
              className={`btn ${!useVoice ? 'btn-primary' : 'btn-outline-primary'} me-2`}
              onClick={() => setUseVoice(false)}
              style={{
                background: !useVoice ? '#ffb6d9' : 'transparent',
                color: !useVoice ? '#2d1b4e' : '#ffffff',
                border: `2px solid ${!useVoice ? '#ffb6d9' : '#ffffff'}`,
                fontWeight: '600'
              }}
            >
              Skriv inn
            </button>
            <button 
              className={`btn ${useVoice ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setUseVoice(true)}
              style={{
                background: useVoice ? '#ffb6d9' : 'transparent',
                color: useVoice ? '#2d1b4e' : '#ffffff',
                border: `2px solid ${useVoice ? '#ffb6d9' : '#ffffff'}`,
                fontWeight: '600'
              }}
            >
              Snakk inn
            </button>
          </div>

          {!useVoice ? (
            <div 
              className="card shadow-sm p-4 mb-4" 
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                width: '100%',
                maxWidth: '520px'
              }}
            >
              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: '#ffffff' }}>Ingredienser du har</label>
                <input
                  type="text"
                  className="form-control"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="F.eks: kylling, ris, paprika"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <small style={{ color: '#ffffff', opacity: 0.8 }}>Skill ingredienser med komma</small>
              </div>

              <button 
                className="btn w-100 py-2"
                onClick={handleSearch}
                disabled={loading}
                style={{
                  background: '#ffb6d9',
                  color: '#2d1b4e',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Søker...' : 'Søk etter oppskrifter'}
              </button>
            </div>
          ) : (
            <div 
              className="card shadow-sm p-4 mb-4" 
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                width: '100%',
                maxWidth: '520px'
              }}
            >
              <h5 className="mb-3 text-center" style={{ color: '#ffffff' }}>Si ingrediensene dine</h5>
              <p className="text-center" style={{ color: '#ffffff', opacity: 0.8 }}>
                For eksempel: "Jeg har kylling, ris og paprika"
              </p>
              
              <VoiceInput onTranscriptionComplete={handleVoiceTranscription} />

              {voiceText && (
                <div className="alert alert-success mt-3">
                  <strong>Du sa:</strong> {voiceText}
                </div>
              )}

              {voiceText && (
                <button 
                  className="btn w-100 mt-3"
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    background: '#ffb6d9',
                    color: '#2d1b4e',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  {loading ? 'Søker...' : 'Søk etter oppskrifter'}
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="alert alert-danger" style={{ maxWidth: '520px', width: '100%' }}>{error}</div>
          )}
        </div>
      </div>

      {recipes.length > 0 && (
        <div className="row g-4 mt-3">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card shadow-sm h-100">
                <img 
                  src={recipe.image} 
                  className="card-img-top" 
                  alt={recipe.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  
                  {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
                    <div className="mb-2">
                      <small className="text-success fw-bold">Brukte ingredienser:</small>
                      <div>
                        {recipe.usedIngredients.map((ing, idx) => (
                          <span key={idx} className="badge bg-success me-1 mb-1">{ing.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
                    <div className="mb-2">
                      <small className="text-warning fw-bold">Mangler:</small>
                      <div>
                        {recipe.missedIngredients.map((ing, idx) => (
                          <span key={idx} className="badge bg-warning me-1 mb-1">{ing.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <button 
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => handleGenerateAI(recipe)}
                    disabled={generatingAI}
                  >
                    {generatingAI && selectedRecipe?.id === recipe.id ? 'Genererer AI...' : 'Generer AI-innhold'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (aiDescription || aiImage) && (
        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-sm p-4">
              <h3 className="mb-3">{selectedRecipe.title}</h3>
              
              {aiDescription && (
                <div className="alert alert-info mb-3">
                  <strong>AI-beskrivelse:</strong>
                  <p className="mb-0 mt-2">{aiDescription}</p>
                </div>
              )}

              {aiImage && (
                <>
                  <img 
                    src={aiImage} 
                    alt="AI-generert bilde" 
                    className="img-fluid rounded mb-3"
                  />
                  
                  <button 
                    className={`btn w-100 ${saved ? 'btn-secondary' : 'btn-success'}`}
                    onClick={handleSave}
                    disabled={saved}
                  >
                    {saved ? 'Lagret!' : 'Lagre oppskrift'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindRecipes;