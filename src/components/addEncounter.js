import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEncounter = () => {
  const [name, setName] = useState('');
  const [fighters, setFighters] = useState([]);
  const [type, setType] = useState('');
  const [hp, setHp] = useState('');
  const [initiative, setInitiative] = useState('');
  const navigate = useNavigate();

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
    <div>
      <h3>Create New Encounter</h3>
      <form onSubmit={handleSubmit}>
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
          <h4>Fighters:</h4>
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
