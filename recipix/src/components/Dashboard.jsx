import React from 'react';

function Dashboard() {
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
            Finn perfekte oppskrifter basert på ingrediensene du har
          </div>

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
              padding: '2.5rem'
            }}
          >
            <h3 style={{ color: '#ffffff', marginBottom: '1.2rem', fontWeight: '600', fontSize: '1.6rem' }}>
              Finn oppskrifter
            </h3>
            <p style={{ color: '#ffffff', marginBottom: '1.8rem', opacity: 0.9, fontSize: '1.05rem' }}>
              Skriv inn ingrediensene dine og få AI-genererte oppskriftsforslag
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
              Søk nå
            </a>
          </div>

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
              padding: '2.5rem'
            }}
          >
            <h3 style={{ color: '#ffffff', marginBottom: '1.2rem', fontWeight: '600', fontSize: '1.6rem' }}>
              Mine oppskrifter
            </h3>
            <p style={{ color: '#ffffff', marginBottom: '1.8rem', opacity: 0.9, fontSize: '1.05rem' }}>
              Se alle dine lagrede oppskrifter
            </p>
            <a 
              href="/saved" 
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
              Se oppskrifter
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;