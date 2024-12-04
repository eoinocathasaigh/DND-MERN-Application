import Sessions from "./Sessions";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SessionTracker = ()=>{
  //useState Allows us to state variables to functional components
  //Essentially another way for us to handle data in the class
  const[session, setSession] = useState([]);
  const Reload = () =>{
    axios.get('http://localhost:4000/api/SessionTracker')
        .then((response)=>{
          console.log(response.data);
          setSession(response.data.mySessions);
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
            <h3>Welcome to the session tracker</h3>
            <p>Sessions are a key part of DND<br/>All that you do will occur during one<br/>And this page is dedicated to helping you keep track og them</p>
            <Link className="btn btn-primary" to={"/addSession"}>Add a new Session</Link>
            {/*We pass the MySessions component the details we have in this class*/}
            <Sessions mySessions ={session} ReloadData={Reload}/>
        </div>
    )
}

export default SessionTracker;