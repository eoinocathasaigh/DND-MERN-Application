import './App.css';
import CharacterCreator from './components/CharacterCreator.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import CombatTracker from './components/CombatTracker';
import SessionTracker from './components/SessionTracker';
import Home from './components/Home';
import CreateSession from './components/addSession';
import EditSesson from "./components/editSession.js"
import AddCharacter from './components/addCharacter';
import EditCharacter from './components/editCharacter.js';
import AddEncounter from './components/addEncounter.js';
import PlayEncounter from './components/playEncounter.js';

function App() {
  return (
    <div className="App">
      {/*Declaring the routes we will use in this application*/}
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Characters" element={<CharacterCreator />} />
          <Route path="/Sessions" element={<SessionTracker />} />
          <Route path="/Combat" element={<CombatTracker />} />
          <Route path="/addSession" element={<CreateSession />} />
          <Route path="/addCharacter" element={<AddCharacter />} />
          <Route path="/edit/:id" element={<EditSesson />} />
          <Route path="/editChar/:id" element={<EditCharacter />} />
          <Route path="/addEncounter" element={<AddEncounter />} />
          <Route path="/playEncounter/:id" element={<PlayEncounter/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
