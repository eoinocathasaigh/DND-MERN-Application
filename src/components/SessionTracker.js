import Sessions from "./Sessions";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/SessionBackground.jpg'

const SessionTracker = () => {
  //useState Allows us to state variables to functional components
  //Essentially another way for us to handle data in the class
  const [session, setSession] = useState([]);

  //Styling this page
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensures the image covers the entire div
    backgroundPosition: 'center', // Centers the image
    height: '90vh', // Sets the height to full viewport height
    overflow: 'auto'
  };

  const headerStyle = {
    backgroundColor: 'white', // Corrected property name
    border: '4px solid black', // Black border
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the div
    maxWidth: '450px', // Restrict the width of the div
    margin: '20px auto', // Center the div and add vertical margin
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Adds a shadow for better visual appeal
  }

  const Reload = () => {
    axios.get('http://localhost:4000/api/SessionTracker')
      .then((response) => {
        console.log(response.data);
        setSession(response.data.mySessions);
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
        <h3>Welcome to the session tracker</h3>
        <p>Sessions are a key part of DND<br />All that you do will occur during one<br />And this page is dedicated to helping you keep track of them</p>
      </div>
      <Link className="btn btn-primary" to={"/addSession"}>Add a new Session</Link>
      {/*We pass the MySessions component the details we have in this class*/}
      <Sessions mySessions={session} ReloadData={Reload} />
    </div>
  )
}

export default SessionTracker;