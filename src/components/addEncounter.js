import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../images/CombatBackground.jpg'

const AddEncounter = () => {
  //Appropriate variables for this class
  const [name, setName] = useState('');
  const [fighters, setFighters] = useState([]);
  const [type, setType] = useState('');
  const [hp, setHp] = useState('');
  const [initiative, setInitiative] = useState('');
  const navigate = useNavigate();

  //Styling the page
  //Main Body
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    height: '90vh', 
    overflow: 'auto'
  };

  //Style for main addition section
  const addStyle = {
    backgroundColor: 'lightblue', 
    border: '4px solid black', 
    borderRadius: '10px', 
    padding: '20px', 
    maxWidth: '450px', 
    margin: '20px auto',
  }

  //Style for section displaying fighters
  const fighterStyle = {
    backgroundColor: 'white',
    border: '4px solid black',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '340px',
    margin: '20px auto',
  }

  //Functionality to add a fighter
  const addFighter = () => {
    setFighters([...fighters, { type, hp: parseInt(hp), initiative: parseInt(initiative) }]);
    setType('');
    setHp('');
    setInitiative('');
  };

  //Handling submitting or completing this encounter
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/encounters', { name, fighters })
      .then(() => navigate('/Combat'))
      .catch((err) => console.error(err));
  };

  //Simple div containing the view of the adding encounter elements
  return (
    <div style={bodyStyle}>
      <div style={addStyle}>
      <h3><b><u>Create New Encounter</u></b></h3>
      <p>Let me explain the aspects of making a new combat encounter in DND<br/>You'll need the following:</p>
      <ul>
        <li><b>Encounter name:</b> Give this encounter a new name to make it more memorable should you need to step away halfway through</li>
        <li><b>Fighter Type:</b> Tell us who you're fighting? What man or monster is the party combatting?</li>
        <li><b>Fighter HP:</b> This marks the total health of the fighter, how many hits they can take before they go down</li>
        <li><b>Fighter Initiative:</b> Initiative helps you keep track of who's turn it is in battle. Ordered from highest to lowest</li>
      </ul>
      </div>
      {/*Interface allowing the user to set the aspects of this encounter, such as its name as well as the details of its fighters*/}
      <form onSubmit={handleSubmit} style={addStyle}>
        <div>
          <label><b><u>Name:</u></b></label><br/>
          <input value={name} onChange={(e) => setName(e.target.value)} required /><br/>
        </div>
        <div>
          <label><b><u>Fighter Type:</u></b></label><br/>
          <input value={type} onChange={(e) => setType(e.target.value)} /><br/>
          <label><b>HP:</b></label><br/>
          <input value={hp} type="number" onChange={(e) => setHp(e.target.value)} /><br/>
          <label><b>Initiative:</b></label><br/>
          <input value={initiative} type="number" onChange={(e) => setInitiative(e.target.value)} /><br/>
          <button type="button" onClick={addFighter}><b>Add Fighter</b></button>
        </div>
        <div style={fighterStyle}>
          <h3><b><u>Fighters:</u></b></h3>
          <ul>
            {/*Listing out each fighter for this encounter*/}
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
