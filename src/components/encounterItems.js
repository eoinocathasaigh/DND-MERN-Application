import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; //Promise based http client
import Button from 'react-bootstrap/Button';

const EncounterItems = (props) => {

    //Styling the cards & their contents
    const cardStyle = {
        backgroundColor: 'gray',
        border: '4px solid black',
        borderRadius: '10px',
        maxWidth: '18rem',
        margin: '20px auto',
    }

    useEffect(() => {
        console.log("Character Details: ", props.myEncounter);
    }, [props.myEncounter]); // Only run this effect when the session prop changes

    const handleDelete = (e) => {
        e.preventDefault();//Stops it from being called multiple times

        //Deleting the session based on the id passed by the url
        axios.delete('http://localhost:4000/api/encounters/' + props.myEncounter._id)
            .then(() => {
                //Then reloadig it after each item is deleted
                props.Reload();
            })
            .catch((error) => {
                console.log("Error deleting Character: ", error);
            })
    }

    //Returning the details of the combat encounter to the screen
    return (
        <div>
            <Card style={cardStyle}>
                <Card.Header style={{ border: '2px solid black', backgroundColor: 'white' }}><b>{props.myEncounter.name}</b></Card.Header>
                <Card.Body style={{ border: '2px solid black', backgroundColor: 'lightblue' }}>
                    <p style={{ border: '2px solid black', backgroundColor: 'white', borderRadius: '10px'}}><b>Currently: {props.myEncounter.fighters.length} fighters in combat</b></p>
                    <Link className="btn btn-primary" to={'/playEncounter/' + props.myEncounter._id}>Play</Link>
                    <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
};

export default EncounterItems;
