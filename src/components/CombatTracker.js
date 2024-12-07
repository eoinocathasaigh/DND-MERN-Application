import Encounters from './encounters';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Combat = ()=>{
  //useState Allows us to state variables to functional components
  //Essentially another way for us to handle data in the class
  const[encounter, setEncounter] = useState([]);
  
  const Reload = () =>{
    axios.get('http://localhost:4000/api/CombatTracker')
        .then((response)=>{
          console.log(response.data);
          setEncounter(response.data.myEncounter);
        })//Callback function - done when request is completed
        .catch(
          (error)=>{
            console.log(error);
          }
        )
  }
    useEffect(()=>{
        Reload();
      },[] // - Stops us from reloading multiple times
    );
    return(
        <div>
            <h3>Welcome to the Combat Tracker</h3>
            <p>Combat is where DND gets really good<br/>And this page is dedicated to helping you create & keep track of them</p>
            <Link className="btn btn-primary" to={"/addCharacter"}>Create a new Combat Encounter</Link>
            {/*We pass the MySessions component the details we have in this class*/}
            <Encounters myEncounter ={encounter} ReloadData={Reload}/>
        </div>
    )
}

export default Combat;