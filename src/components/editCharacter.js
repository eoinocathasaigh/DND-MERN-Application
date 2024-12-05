import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditCharacter = () => {
    //Declaring & setting all the values for the specific session
    const {id} = useParams();
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [playerClass, setClass] = useState('');
    const [level, setLevel] = useState('');
    const navigate = useNavigate();

    //Handling moving to this page - sets the data automatically based on the session we choose
    useEffect(()=>{
        axios.get('http://localhost:4000/api/session/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setName(res.data.name);
            setRace(res.data.race);
            setClass(res.data.playerClass);
            setLevel(res.data.level);
        })
        .catch((err)=>{console.log(err)});
    },[id]);

    //Handling submitting the session - calls put method & sends the values to it
    const handleSubmit = (e) => {
        e.preventDefault();
        const player = {name,race,playerClass,level};
        console.log(player);

        axios.put('http://localhost:4000/api/Character/'+id, player)
        .then((res)=>{
            console.log("Edited: "+res.data);
            navigate('/Characters');
        })
        .catch((err)=>{
            console.log(err);
        });
      
    }

    //Returning the layout for the page - allowing us to edit & change values
    return (
        <div>
            <h3><b>Editing Character:</b> {name}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Character Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Edit Character Race: </label>
                    <input type="text"
                        className="form-control"
                        value={race}
                        onChange={(e) => { setRace(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Edit Character Class: </label>
                    <input type="text"
                        className="form-control"
                        value={playerClass}
                        onChange={(e) => { setClass(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Edit Character Level: </label>
                    <input type="text"
                        className="form-control"
                        value={level}
                        onChange={(e) => { setLevel(e.target.value) }}/>
                </div>
                <div>
                    <input type="submit" value="Edit Character Details"></input>
                </div>
            </form>
        </div>
    );
}
export default EditCharacter;