import './App.css';
import Character from './components/Character';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import Combat from './components/Combat';
import GeneralInfo from './components/GeneralInfo';
import SessionTracker from './components/SessionTracker';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/GeneralInfo" element={<GeneralInfo/>} />
          <Route path="/Character" element={<Character/>} />
          <Route path="/Sessions" element={<SessionTracker/>} />
          <Route path="/Combat" element={<Combat/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
