import Characters from './Characters';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/characterBackground.jpg'

const CharacterCreator = () => {
  //useState Allows us to state variables to functional components
  const [character, setCharacter] = useState([]);

  //Styling this page
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    height: '90vh', 
    overflow: 'auto'
  };

  const headerStyle = {
    backgroundColor: 'lightblue',
    border: '4px solid black', 
    borderRadius: '10px', 
    padding: '20px', 
    maxWidth: '450px', 
    margin: '20px auto',
  }

  //Simple method for reloading the page when an item is deleted
  const Reload = () => {
    axios.get('http://localhost:4000/api/CharacterCreator')
      .then((response) => {
        console.log(response.data);
        setCharacter(response.data.myCharacter);
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
        <h3><b><u>Welcome to the Character Creator</u></b></h3>
        <p>Characters are a key part of DND<br />After all, they're you!<br />And this page is dedicated to helping you create & keep track of them</p>
      </div>
      <Link className="btn btn-primary" to={"/addCharacter"}>Create a new Character</Link>
      {/*We pass the MyCharacter component the details we have in this class*/}
      <Characters myCharacter={character} ReloadData={Reload} />
    </div>
  )
}

export default CharacterCreator;