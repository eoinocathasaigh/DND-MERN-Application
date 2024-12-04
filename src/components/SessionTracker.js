import Sessions from "./Sessions";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//Importing our Movies component

//Read component holds an array of JSON data we will pass to our movies component to use from there
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
      },[] // - Doing this calms the array to stop it from being called multiple times
    );
    return(
        <div>
            <h3>Hello from the Read component</h3>
            <Link className="btn btn-primary" to={"/addSession"}>Add a new Session</Link>
            {/*We create the variable "myMovies" for our movies component and pass it the data we have in this class*/}
            <Sessions mySessions ={session} ReloadData={Reload}/>
        </div>
    )
}

export default SessionTracker;