import './App.css';
import CharacterCreator from './components/CharacterCreator';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import CombatTracker from './components/CombatTracker';
import GeneralInfo from './components/GeneralInfo';
import SessionTracker from './components/SessionTracker';
import Home from './components/Home';
import CreateSession from './components/addSession';
import EditSesson from "./components/editSession.js"
import AddCharacter from './components/addCharacter';
import EditCharacter from './components/editCharacter.js';

function App() {
  return (
    <div className="App">
      {/*Declaring the routes we will use in this application*/}
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/GeneralInfo" element={<GeneralInfo/>} />
          <Route path="/Characters" element={<CharacterCreator/>} />
          <Route path="/Sessions" element={<SessionTracker/>} />
          <Route path="/Combat" element={<CombatTracker/>} />
          <Route path="/addSession" element={<CreateSession/>}/>
          <Route path="/addCharacter" element={<AddCharacter/>}/>
          <Route path="/edit/:id" element={<EditSesson/>}/>
          <Route path="/edit/:id" element={<EditCharacter/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
