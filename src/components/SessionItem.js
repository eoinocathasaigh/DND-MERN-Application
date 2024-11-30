import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; //Promise based http client
import Button from 'react-bootstrap/Button';
//import Typography from '@mui/material/Typography';

const SessionItem = (props) =>{

    //Can do a similar thing eg React when something changes
    useEffect(() => {
        console.log("Session Details: ", props.mySession);
      }, [props.mySession]); // Only run this effect when the mymovie prop changes
    
      const handleDelete = (e) =>{
        e.preventDefault();//Stops it from being called multiple times
        
        //Deleting the session based on the url
        axios.delete('http://localhost:4000/api/SessionTracker/' + props.mySession._id)
        .then(() => {
            props.Reload();
        })
        .catch((error) =>{
            console.log("Error deleting session: ", error);
        })
      }
    return(
        <div>
            {/*This card format is exactly the same as simply 
            Printing out each element into a h3 or an image
            The main difference is that this time its formatted better into individual cards*/}

            {/*This method is the bootstrap variant of the cards format
            Requires importing the card component from the react bootstrap*/}
            <Card style={{ width: '18rem' }}>
                <Card.Header>{props.mySession.title}</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={props.mySession.logo} />
                    
                    <footer>{props.mySession.campaign}</footer>
                </Card.Body>
                {/*We want to redirect the user to a different url when they click this button*/}
                {/*The props.myMovies._id will give us the unique id for each individual movie*/}
                <Link className="btn btn-primary" to={"/edit/"+props.mySession._id}>Edit Session</Link>
                <Button className='btn btn-danger' onClick={handleDelete}>Delete Session</Button>
            </Card>
        </div>
    )
}

export default SessionItem