import Characters from './Characters';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterCreator = ()=>{
  //useState Allows us to state variables to functional components
  //Essentially another way for us to handle data in the class
  const[character, setCharacter] = useState([]);
  const Reload = () =>{
    axios.get('http://localhost:4000/api/CharacterCreator')
        .then((response)=>{
          console.log(response.data);
          setCharacter(response.data.myCharacter);
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
            <h3>Welcome to the Character Creator</h3>
            <p>Characters are a key part of DND<br/>After all, they're you!<br/>And this page is dedicated to helping you create & keep track of them</p>
            <Link className="btn btn-primary" to={"/addCharacter"}>Create a new Character</Link>
            {/*We pass the MySessions component the details we have in this class*/}
            <Characters myCharacter ={character} ReloadData={Reload}/>
        </div>
    )
}

export default CharacterCreator;