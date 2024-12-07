import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; //Promise based http client
import Button from 'react-bootstrap/Button';

const EncounterItems = (props) => {

    useEffect(() => {
        console.log("Character Details: ", props.myEncounter);
    }, [props.myEncounter]); // Only run this effect when the session prop changes

    const handleDelete = (e) =>{
        e.preventDefault();//Stops it from being called multiple times
        
        //Deleting the session based on the id passed by the url
        axios.delete('http://localhost:4000/api/encounters/' + props.myEncounter._id)
        .then(() => {
            //Then reloadig it after each item is deleted
            props.Reload();
        })
        .catch((error) =>{
            console.log("Error deleting Character: ", error);
        })
      }

    return (
        <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Header>{props.myEncounter.name}</Card.Header>
            <Card.Body>
                <p>{props.myEncounter.fighters.length} Fighters</p>
                <Link className="btn btn-primary" to={'/playEncounter/' + props.myEncounter._id}>Play</Link>
                <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
};

export default EncounterItems;
