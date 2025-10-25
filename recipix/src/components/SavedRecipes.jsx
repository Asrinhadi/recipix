import { useState, useEffect } from 'react';
import { getSavedRecipes, deleteRecipe } from '../services/localStorage';

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = () => {
    const recipes = getSavedRecipes();
    setSavedRecipes(recipes);
  };

  const handleDelete = (id) => {
    if (window.confirm('Er du sikker på at du vil slette denne oppskriften?')) {
      deleteRecipe(id);
      loadSavedRecipes();
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: '85vh', display: 'flex', alignItems: 'flex-start', paddingTop: '1rem' }}>
      <div className="row w-100" style={{ margin: '0 auto', maxWidth: '1400px' }}>
        
        <div className="col-md-6"></div>

        <div className="col-md-6 d-flex flex-column align-items-end" style={{ padding: '1rem 3rem 2rem 2rem', gap: '1.5rem' }}>
          
          <div
            style={{
              background: 'rgba(20, 20, 22, 0.35)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '1rem 2rem',
              fontSize: '1.15rem',
              fontWeight: 700,
              textAlign: 'center',
              boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
              width: 'fit-content',
              maxWidth: '100%'
            }}
          >
            Dine lagrede oppskrifter
          </div>

          {savedRecipes.length === 0 ? (
            <div 
              className="card shadow-sm" 
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                width: '100%',
                maxWidth: '520px',
                padding: '2.5rem',
                textAlign: 'center'
              }}
            >
              <h3 style={{ color: '#ffffff', marginBottom: '1.2rem', fontWeight: '600', fontSize: '1.6rem' }}>
                Ingen lagrede oppskrifter ennå
              </h3>
              <p style={{ color: '#ffffff', marginBottom: '1.8rem', opacity: 0.9, fontSize: '1.05rem' }}>
                Gå til "Finn oppskrifter" for å søke og lagre oppskrifter!
              </p>
              <a 
                href="/find" 
                className="btn w-100" 
                style={{
                  background: '#ffb6d9',
                  color: '#2d1b4e',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 182, 217, 0.4)',
                  textDecoration: 'none',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#ff99cc';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 182, 217, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#ffb6d9';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 182, 217, 0.4)';
                }}
              >
                Finn oppskrifter
              </a>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '1200px' }}>
              <div className="row g-4">
                {savedRecipes.map((recipe) => (
                  <div key={recipe.id} className="col-md-6">
                    <div 
                      className="card shadow-sm h-100" 
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '20px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        overflow: 'hidden'
                      }}
                    >
                      <img 
                        src={recipe.image || recipe.originalImage} 
                        className="card-img-top" 
                        alt={recipe.title}
                        style={{ 
                          height: '250px', 
                          objectFit: 'cover',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                      <div className="card-body" style={{ padding: '1.5rem' }}>
                        <h5 className="card-title" style={{ 
                          color: '#ffffff', 
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          marginBottom: '1rem'
                        }}>{recipe.title}</h5>
                        
                        {recipe.description && (
                          <p style={{ 
                            color: '#ffffff', 
                            opacity: 0.9,
                            fontSize: '0.95rem',
                            marginBottom: '1rem'
                          }}>
                            {recipe.description.length > 150 
                              ? recipe.description.substring(0, 150) + '...' 
                              : recipe.description}
                          </p>
                        )}

                        {recipe.searchIngredients && (
                          <div className="mb-3">
                            <small style={{ color: '#ffffff', opacity: 0.7 }}>Søkte ingredienser:</small>
                            <div style={{ 
                              color: '#ffb6d9', 
                              fontSize: '0.9rem',
                              fontStyle: 'italic'
                            }}>
                              {recipe.searchIngredients}
                            </div>
                          </div>
                        )}

                        {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
                          <div className="mb-2">
                            <small style={{ color: '#ffffff', opacity: 0.7 }}>Brukte ingredienser:</small>
                            <div>
                              {recipe.usedIngredients.map((ing, idx) => (
                                <span key={idx} className="badge me-1 mb-1" style={{
                                  background: 'rgba(25, 135, 84, 0.3)',
                                  color: '#40d9a3',
                                  border: '1px solid #40d9a3',
                                  padding: '4px 8px'
                                }}>{ing.name}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
                          <div className="mb-3">
                            <small style={{ color: '#ffffff', opacity: 0.7 }}>Manglende ingredienser:</small>
                            <div>
                              {recipe.missedIngredients.map((ing, idx) => (
                                <span key={idx} className="badge me-1 mb-1" style={{
                                  background: 'rgba(255, 193, 7, 0.3)',
                                  color: '#ffc107',
                                  border: '1px solid #ffc107',
                                  padding: '4px 8px'
                                }}>{ing.name}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="card-footer bg-transparent" style={{ 
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '1rem 1.5rem'
                      }}>
                        <button 
                          className="btn w-100"
                          onClick={() => handleDelete(recipe.id)}
                          style={{
                            background: 'transparent',
                            color: '#ff6b6b',
                            border: '2px solid #ff6b6b',
                            borderRadius: '8px',
                            padding: '10px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#ff6b6b';
                            e.target.style.color = '#ffffff';
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#ff6b6b';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          Slett oppskrift
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedRecipes;