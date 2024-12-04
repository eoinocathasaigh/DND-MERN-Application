import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios'; //Promise based http client
import Button from 'react-bootstrap/Button';

const CharacterItems = (props) =>{

    useEffect(() => {
        console.log("Character Details: ", props.MyCharacter);
      }, [props.MyCharacter]); // Only run this effect when the session prop changes
    
      //Handling the deletion of sessions
      const handleDelete = (e) =>{
        e.preventDefault();//Stops it from being called multiple times
        
        //Deleting the session based on the id passed by the url
        axios.delete('http://localhost:4000/api/session/' + props.MyCharacter._id)
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
                <Card.Header><b>{props.MyCharacter.title}</b></Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={props.MyCharacter.logo} />
                    <Card.Body>{props.MyCharacter.information}</Card.Body>
                    <footer><b>Campaign:</b> {props.MyCharacter.campaign}</footer>
                </Card.Body>
                {/*The props.mySession._id will give us the unique id for each individual session*/}
                {/*Allows us to edit specific sessions*/}
                <Link className="btn btn-primary" to={"/edit/"+props.MySession._id}>Edit Character</Link>
                <Button className='btn btn-danger' onClick={handleDelete}>Delete Character</Button>
            </Card>
        </div>
    )
}

export default CharacterItems;