import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ 
      background: '#000000',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
    }}>
      <div className="container-fluid">
        <Link 
          className="navbar-brand fw-bold" 
          to="/" 
          style={{ 
            color: '#ffb6d9', 
            fontSize: '2rem',
            fontWeight: '900',
            textDecoration: 'none'
          }}
        >
          HOME
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{
            borderColor: '#ffffff'
          }}
        >
          <span className="navbar-toggler-icon" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
          }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/" 
                style={{ 
                  color: '#ffffff',
                  fontWeight: '500',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffb6d9'}
                onMouseLeave={(e) => e.target.style.color = '#ffffff'}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/find" 
                style={{ 
                  color: '#ffffff',
                  fontWeight: '500',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffb6d9'}
                onMouseLeave={(e) => e.target.style.color = '#ffffff'}
              >
                Finn oppskrifter
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/saved" 
                style={{ 
                  color: '#ffffff',
                  fontWeight: '500',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffb6d9'}
                onMouseLeave={(e) => e.target.style.color = '#ffffff'}
              >
                Mine oppskrifter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;