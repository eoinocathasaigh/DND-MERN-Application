import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const SessionItem = (props) => {

    //Styling the cards & their contents
    const cardStyle = {
        backgroundColor: 'violet',
        border: '4px solid black',
        borderRadius: '10px',
        maxWidth: '18rem',
        margin: '20px auto',
    }

    useEffect(() => {
        console.log("Session Details: ", props.MySession);
    }, [props.MySession]); // Only run this effect when the session prop changes

    //Handling the deletion of sessions
    const handleDelete = (e) => {
        e.preventDefault();//Stops it from being called multiple times

        //Deleting the session based on the id passed by the url
        axios.delete('http://localhost:4000/api/session/' + props.MySession._id)
            .then(() => {
                //Then reloadig it after each item is deleted
                props.Reload();
            })
            .catch((error) => {
                console.log("Error deleting session: ", error);
            })
    }
    return (
        <div>
            {/*This method is the bootstrap variant of the cards format*/}
            <Card style={cardStyle}>
                <Card.Header style={{ border: '2px solid black', backgroundColor: 'white' }}><b>{props.MySession.title}</b></Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={props.MySession.logo} style={{ border: '2px solid black' }}/>
                    <Card.Body style={{ border: '2px solid black', backgroundColor: 'lightblue' }}><b><u>Session Information:</u></b> {props.MySession.information}</Card.Body>
                    <footer style={{ border: '2px solid black', backgroundColor: 'lightblue' }}><b><u>Campaign:</u></b> {props.MySession.campaign}</footer>
                </Card.Body>
                {/*Simple Buttons for navigating to editing a session & deleting*/}
                <Link className="btn btn-primary" to={"/edit/" + props.MySession._id}>Edit Session</Link>
                <Button className='btn btn-danger' onClick={handleDelete}>Delete Session</Button>
            </Card>
            <br />
        </div>
    )
}

export default SessionItem