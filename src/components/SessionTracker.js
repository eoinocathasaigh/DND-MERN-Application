import Sessions from "./Sessions";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/SessionBackground.jpg'

const SessionTracker = () => {
  //Variable allowing us to handle the data we retrieve
  const [session, setSession] = useState([]);

  //Styling this page - the main body & the smaller components
  const bodyStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    height: '90vh', 
    overflow: 'auto'
  };

  const headerStyle = {
    backgroundColor: 'white',
    border: '4px solid black',
    borderRadius: '10px',
    padding: '20px', 
    maxWidth: '450px', 
    margin: '20px auto', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
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