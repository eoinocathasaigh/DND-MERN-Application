import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PlayEncounter = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [fighters, setFighters] = useState([]);
  const [type, setType] = useState('');
  const [hp, setHp] = useState('');
  const [initiative, setInitiative] = useState('');
  const navigate = useNavigate();

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

  const addFighter = () => {
    //Creating a new array of fighters
    setFighters([...fighters, { type, hp: parseInt(hp), initiative: parseInt(initiative) }]);
    //Resetting eacho of the entry values back to blank so a new fighter can be entered
    setType('');
    setHp('');
    setInitiative('');
  };

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

  // Sort fighters by initiative (highest to lowest)
  const sortedFighters = fighters.sort((a, b) => b.initiative - a.initiative);

  return (
    <div>
      <h3><b>Playing Encounter:</b> {name}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label><b>Name:</b></label><br></br>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label><b>Fighter Type:</b></label><br></br>
          <input value={type} onChange={(e) => setType(e.target.value)} /><br></br>
          <label><b>HP:</b></label><br></br>
          <input value={hp} type="number" onChange={(e) => setHp(e.target.value)} /><br></br>
          <label><b>Initiative:</b></label><br></br>
          <input value={initiative} type="number" onChange={(e) => setInitiative(e.target.value)} /><br></br>
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
