import Characters from './Characters';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/characterBackground.jpg'

const CharacterCreator = () => {
  //useState Allows us to state variables to functional components
  //Essentially another way for us to handle data in the class
  const [character, setCharacter] = useState([]);

  //Styling this page
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
        <h3>Welcome to the Character Creator</h3>
        <p>Characters are a key part of DND<br />After all, they're you!<br />And this page is dedicated to helping you create & keep track of them</p>
      </div>
      <Link className="btn btn-primary" to={"/addCharacter"}>Create a new Character</Link>
      {/*We pass the MySessions component the details we have in this class*/}

      <Characters myCharacter={character} ReloadData={Reload} />
    </div>
  )
}

export default CharacterCreator;