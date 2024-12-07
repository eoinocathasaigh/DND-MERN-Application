import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; //Promise based http client
import Button from 'react-bootstrap/Button';

const EncounterItems = (props) =>{

    useEffect(() => {
        console.log("Encounter Details: ", props.myEncounter);
      }, [props.myCharacter]); // Only run this effect when the session prop changes
    
      //Handling the deletion of sessions
      const handleDelete = (e) =>{
        e.preventDefault();//Stops it from being called multiple times
        
        //Deleting the session based on the id passed by the url
        axios.delete('http://localhost:4000/api/Combat/' + props.myEncounter._id)
        .then(() => {
            //Then reloadig it after each item is deleted
            props.Reload();
        })
        .catch((error) =>{
            console.log("Error deleting Character: ", error);
        })
      }
    return(
        <div>
            {/*This method is the bootstrap variant of the cards format
            Requires importing the card component from the react bootstrap*/}
            <Card style={{ width: '18rem', margin: "auto" }}>
                
                {/*The props.mySession._id will give us the unique id for each individual session*/}
                {/*Allows us to edit specific sessions*/}
                <Link className="btn btn-primary" to={"/editEncounter/"+props.myEncounter._id}>Edit Encounter</Link>
                <Button className='btn btn-danger' onClick={handleDelete}>Delete Encounter</Button>
            </Card>
        </div>
    )
}

export default EncounterItems;