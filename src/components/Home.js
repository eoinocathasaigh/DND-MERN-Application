import React from 'react';
import logo from '../DnDLogo.svg';
import '../App.css';

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to my DnD app<br></br> A hub with some basic tools to do with the famous table top game</h1>
      </header>
    </div>
  );
}

export default Home;