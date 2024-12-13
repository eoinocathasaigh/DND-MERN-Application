import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Encounters from './encounters.js'
import backgroundImage from '../images/CombatBackground.jpg'

const CombatTracker = () => {
  const [encounter, setEncounters] = useState([]);

  //Styling for the page - simply helps me style certain components of this page
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh',
    overflow: 'auto'
  };

  const headerStyle = {
    backgroundColor: 'violet', 
    border: '4px solid black', 
    borderRadius: '10px',
    padding: '20px', 
    maxWidth: '450px',
    margin: '20px auto', 
  }

  //Method for reloading after a new encounter has been created
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

  useEffect(() => {
    Reload();
  }, [] // - Stops us from reloading multiple times
  );

  return (
    <div style={bodyStyle}>
      <div style={headerStyle}>
        <h3><b><u>Combat Encounters</u></b></h3>
        <p>Combat is a key part of DND, its where things get really good.<br />But it can be hard to keep track of things with combat. Thats why this page exists, from here you can update, & keep track of each fighters position & health</p>
      </div>
      <Link className="btn btn-primary" to="/addEncounter">Create New Encounter</Link>
      <Encounters myEncounter={encounter} ReloadData={Reload} />
    </div>
  );
};

export default CombatTracker;
