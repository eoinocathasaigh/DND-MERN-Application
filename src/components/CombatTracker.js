import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Encounters from './encounters.js'
import backgroundImage from '../images/CombatBackground.jpg'

const CombatTracker = () => {
  const [encounter, setEncounters] = useState([]);

  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensures the image covers the entire div
    backgroundPosition: 'center', // Centers the image
    height: '90vh', // Sets the height to full viewport height
    overflow: 'auto'
  };

  const headerStyle = {
    backgroundColor: 'lightblue', // Corrected property name
    border: '4px solid black', // Black border
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the div
    maxWidth: '450px', // Restrict the width of the div
    margin: '20px auto', // Center the div and add vertical margin
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Adds a shadow for better visual appeal
  }

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
        <h3>Combat Encounters</h3>
        <p>Combat is a key part of DND, its where things get really good.<br />But it can be hard to keep track of things with combat. Thats why this page exists, from here you can update, & keep track of each fighters position & health</p>
      </div>
      <Link className="btn btn-primary" to="/addEncounter">Create New Encounter</Link>
      <Encounters myEncounter={encounter} ReloadData={Reload} />
    </div>
  );
};

export default CombatTracker;
