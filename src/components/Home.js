import React from 'react';
import logo from '../DnDLogo.svg';
import '../App.css';

//This is a basic home component meant to act as the homepage - default view for the user
const Home = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to my DnD app<br></br> A hub with some basic tools to do with the famous table top game</h1>
        <p>My App provides the following functionalities:</p>
        <ul>
          <li>Character Creation</li>
          <li>Session Tracking</li>
          <li>Combat Tracking</li>
        </ul>
        <p>To experience what the application has to offer, simply click on the appropriate element in the navbar to navigate to that page</p>
      </header>
    </div>
  );
}

export default Home;