import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Encounters from './encounters.js'

const CombatTracker = () => {
  const [encounter, setEncounters] = useState([]);

  const Reload = () => {
    axios.get('http://localhost:4000/api/CombatTracker')
      .then((response) => {
        console.log(response.data);
        setEncounters(response.data.myEncounter);
      })//Callback function - done when request is completed
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  useEffect(()=>{
    Reload();
  },[] // - Stops us from reloading multiple times
);

  return (
    <div>
      <h3>Combat Encounters</h3>
      <Link className="btn btn-primary" to="/addEncounter">Create New Encounter</Link>
      <div>
        <Encounters myEncounter={encounter} ReloadData={Reload} />
      </div>
    </div>
  );
};

export default CombatTracker;
