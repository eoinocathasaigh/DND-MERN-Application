import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from '../images/CombatBackground.jpg'

//This class performs similar functionality to editing seen in other functionality
const PlayEncounter = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [fighters, setFighters] = useState([]);
  const [type, setType] = useState('');
  const [hp, setHp] = useState('');
  const [initiative, setInitiative] = useState('');
  const navigate = useNavigate();

  //Styling the page
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh',
    overflow: 'auto'
  };

  const playStyle = {
    backgroundColor: 'lightblue',
    border: '4px solid black',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '450px',
    margin: '20px auto',
  }

  // Fetch encounter data on page load
  useEffect(() => {
    axios.get('http://localhost:4000/api/encounters/' + id)
      .then((res) => {
        console.log("Success: ", res.data);
        setName(res.data.name);
        setFighters(res.data.fighters);
      })
      .catch((err) => { console.log(err) });
  }, [id]);

  //Method of adding a new character/fighter to the page
  const addFighter = () => {
    //Creating a new array of fighters
    setFighters([...fighters, { type, hp: parseInt(hp), initiative: parseInt(initiative) }]);
    //Resetting each of the entry values back to blank so a new fighter can be entered
    setType('');
    setHp('');
    setInitiative('');
  };

  //Handling submitting the items of the newly created encounter
  const handleSubmit = (e) => {
    e.preventDefault();
    const encounter = { name, fighters };
    console.log("Saving encounter:", encounter);

    axios.put('http://localhost:4000/api/encounters/' + id, encounter)
      .then((res) => {
        console.log("Encounter updated:", res.data);
        navigate('/Combat');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Sort fighters by initiative (highest to lowest)
  const sortedFighters = fighters.sort((a, b) => b.initiative - a.initiative);

  return (
    <div style={bodyStyle}>
      <div style={playStyle}>
        <h3><b>Playing Encounter:</b> {name}</h3>
      </div>
      <form onSubmit={handleSubmit} style={playStyle}>
        <div>
          <label><b>Name:</b></label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label><b>Fighter Type:</b></label><br />
          <input value={type} onChange={(e) => setType(e.target.value)} /><br />
          <label><b>HP:</b></label><br />
          <input value={hp} type="number" onChange={(e) => setHp(e.target.value)} /><br />
          <label><b>Initiative:</b></label><br />
          <input value={initiative} type="number" onChange={(e) => setInitiative(e.target.value)} /><br />
          <button type="button" onClick={addFighter}>Add Fighter</button>
        </div>
        <div>
          <h4>Fighters:</h4>
          <ul>
            {sortedFighters.map((fighter, index) => (
              <li key={index}>
                <b>{fighter.type}</b> - <b>Initiative:</b> {fighter.initiative}, <b>HP:</b> {fighter.hp}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Save Encounter</button>
      </form>
    </div>
  );
};

export default PlayEncounter;
