import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; //Promise based http client
import Button from 'react-bootstrap/Button';

//import Typography from '@mui/material/Typography';

const SessionItem = (props) =>{

    //Can do a similar thing eg React when something changes
    useEffect(() => {
        console.log("Session Details: ", props.MySession);
      }, [props.MySession]); // Only run this effect when the mymovie prop changes
    
      //Handling the deletion of sessions
      const handleDelete = (e) =>{
        e.preventDefault();//Stops it from being called multiple times
        
        //Deleting the session based on the url
        axios.delete('http://localhost:4000/api/session/' + props.MySession._id)
        .then(() => {
            props.Reload();
        })
        .catch((error) =>{
            console.log("Error deleting session: ", error);
        })
      }
    return(
        <div>
            {/*This method is the bootstrap variant of the cards format
            Requires importing the card component from the react bootstrap*/}
            <Card style={{ width: '18rem', margin: "auto" }}>
                <Card.Header><b>{props.MySession.title}</b></Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={props.MySession.logo} />
                    <Card.Body>{props.MySession.information}</Card.Body>
                    <footer><b>Campaign:</b> {props.MySession.campaign}</footer>
                </Card.Body>
                {/*We want to redirect the user to a different url when they click this button*/}
                {/*The props.myMovies._id will give us the unique id for each individual movie*/}
                <Link className="btn btn-primary" to={"/edit/"+props.MySession._id}>Edit Session</Link>
                <Button className='btn btn-danger' onClick={handleDelete}>Delete Session</Button>
            </Card>
        </div>
    )
}

export default SessionItem