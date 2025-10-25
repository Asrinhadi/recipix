import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FindRecipes from './components/FindRecipes';
import SavedRecipes from './components/SavedRecipes';
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <Router>
      
      <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <NavigationBar /> 
        <div className="container mt-4 pb-5"> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/find" element={<FindRecipes />} />
            <Route path="/saved" element={<SavedRecipes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;