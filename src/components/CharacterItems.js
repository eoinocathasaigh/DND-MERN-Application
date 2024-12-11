import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';

const CharacterItems = (props) => {

    useEffect(() => {
        console.log("Character Details: ", props.myCharacter);
    }, [props.myCharacter]); // Only run this effect when the session prop changes

    //Handling the deletion of sessions
    const handleDelete = (e) => {
        e.preventDefault();

        //Deleting the character based on their unique id
        axios.delete('http://localhost:4000/api/Character/' + props.myCharacter._id)
            .then(() => {
                //Then reloadig it after each item is deleted
                props.Reload();
            })
            .catch((error) => {
                console.log("Error deleting Character: ", error);
            })
    }
    return (
        <div>
            {/*This is simply a way of displaying the information of each character*/}
            <Card style={{ width: '18rem', margin: "auto" }}>
                <Card.Header><b>{props.myCharacter.name}</b></Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={props.myCharacter.image} />
                    <Card.Body><b>Race: </b>{props.myCharacter.race}<br />
                        <b>Level</b> {props.myCharacter.level}</Card.Body>
                    <footer><b>Class:</b> {props.myCharacter.class}</footer>
                </Card.Body>
                {/*props.mySession._id -> allows us to target the specific item*/}
                <Link className="btn btn-primary" to={"/editChar/" + props.myCharacter._id}>Edit Character</Link>
                <Button className='btn btn-danger' onClick={handleDelete}>Delete Character</Button>
            </Card>
            <br/>
        </div>
    )
}

export default CharacterItems;