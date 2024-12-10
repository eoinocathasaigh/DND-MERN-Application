import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../images/CombatBackground.jpg'

const AddEncounter = () => {
  const [name, setName] = useState('');
  const [fighters, setFighters] = useState([]);
  const [type, setType] = useState('');
  const [hp, setHp] = useState('');
  const [initiative, setInitiative] = useState('');
  const navigate = useNavigate();

  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensures the image covers the entire div
    backgroundPosition: 'center', // Centers the image
    height: '90vh', // Sets the height to full viewport height
    overflow: 'auto'
  };

  const addStyle = {
    backgroundColor: 'lightblue', // Corrected property name
    border: '4px solid black', // Black border
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the div
    maxWidth: '450px', // Restrict the width of the div
    margin: '20px auto', // Center the div and add vertical margin
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Adds a shadow for better visual appeal
  }

  const addFighter = () => {
    setFighters([...fighters, { type, hp: parseInt(hp), initiative: parseInt(initiative) }]);
    setType('');
    setHp('');
    setInitiative('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/encounters', { name, fighters })
      .then(() => navigate('/Combat'))
      .catch((err) => console.error(err));
  };

  return (
    <div style={bodyStyle}>
      <div style={addStyle}>
      <h3>Create New Encounter</h3>
      <p>Let me explain the aspects of making a new combat encounter in DND<br/>You'll need the following:</p>
      <ul>
        <li><b>Encounter name:</b> Give this encounter a new name to make it more memorable should you need to step away halfway through</li>
        <li><b>Fighter Type:</b> Tell us who you're fighting? What man or monster is the party combatting?</li>
        <li><b>Fighter HP:</b> This marks the total health of the fighter, how many hits they can take before they go down</li>
        <li><b>Fighter Initiative:</b> Initiative helps you keep track of who's turn it is in battle. Ordered from highest to lowest</li>
      </ul>
      </div>
      <form onSubmit={handleSubmit} style={addStyle}>
        <div>
          <label><b>Name:</b></label><br/>
          <input value={name} onChange={(e) => setName(e.target.value)} required /><br/>
        </div>
        <div>
          <label><b>Fighter Type:</b></label><br/>
          <input value={type} onChange={(e) => setType(e.target.value)} /><br/>
          <label><b>HP:</b></label><br/>
          <input value={hp} type="number" onChange={(e) => setHp(e.target.value)} /><br/>
          <label><b>Initiative:</b></label><br/>
          <input value={initiative} type="number" onChange={(e) => setInitiative(e.target.value)} /><br/>
          <button type="button" onClick={addFighter}><b>Add Fighter</b></button>
        </div>
        <div>
          <h3>Fighters:</h3>
          <ul>
            {fighters.map((fighter, index) => (
              <li key={index}>{fighter.type} - HP: {fighter.hp}, Initiative: {fighter.initiative}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Save Encounter</button>
      </form>
    </div>
  );
};

export default AddEncounter;
