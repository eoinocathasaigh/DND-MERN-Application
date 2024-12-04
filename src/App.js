import './App.css';
import CharacterCreator from './components/CharacterCreator';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import CombatTracker from './components/CombatTracker';
import GeneralInfo from './components/GeneralInfo';
import SessionTracker from './components/SessionTracker';
import Home from './components/Home';
import Create from './components/addSession';
import Edit from './components/editSession';
import createChar from './components/addCharacter';

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
          <Route path="/addSession" element={<Create/>}/>
          <Route path="/addCharacter" element={<createChar/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
