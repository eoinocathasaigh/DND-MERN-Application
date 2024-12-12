import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/characterBackground.jpg'

const EditCharacter = () => {
    //Declaring & setting all the values for the specific session
    const { id } = useParams();
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [playerClass, setClass] = useState('');
    const [level, setLevel] = useState('');
    const [image, setImage] = useState('');
    const [availableRaces, setAvailableRaces] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);
    const navigate = useNavigate();

    //Styling this page
    const bodyStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        overflow: 'auto'
    };

    const editStyle = {
        backgroundColor: 'lightblue',
        border: '4px solid black',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '250px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    //Handling moving to this page - sets the data automatically based on the session we choose
    useEffect(() => {
        axios.get('http://localhost:4000/api/Character/' + id)
            .then((res) => {
                console.log("sucess " + res.data);
                setName(res.data.name);
                setRace(res.data.race);
                setClass(res.data.playerClass);
                setLevel(res.data.level);
            })
            .catch((err) => { console.log(err) });

        axios.get('http://localhost:4000/api/options')
            .then((res) => {
                setAvailableRaces(res.data.race);
                setAvailableClasses(res.data.classes);
            })
            .catch((error) => console.error('Error fetching options:', error));
    }, [id]);

    useEffect(() =>{
        const classToImageMap = {
            "Dragonborn": "https://i.pinimg.com/736x/1b/2b/21/1b2b215cad3448912075b9b2852db6fe.jpg",
            "Dwarf": "https://www.gmbinder.com/images/6oHntST.png",
            "Elf": "https://149844032.v2.pressablecdn.com/wp-content/uploads/2021/04/lorracyn__the_half_elf_ranger_by_ohheyitskaylak_deesm7m-fullview.jpg",
            "Gnome": "https://i.pinimg.com/736x/05/a7/46/05a746d4d42df4a51f65154aff8e1d43.jpg",
            "Half-Elf": "https://d1vzi28wh99zvq.cloudfront.net/images/19187/352703.jpg",
            "Half-Orc": "https://www.dndbeyond.com/avatars/thumbnails/6/466/420/618/636274570630462055.png",
            "Halfling": "https://i.pinimg.com/736x/7e/62/12/7e62126c49580e19ea158bdfd61237b5.jpg",
            "Human": "https://dmingdad.com/wp-content/uploads/dungeons-and-dragons-human-fighter.png",
            "Tiefling": "https://pbs.twimg.com/media/C4HRsJJWQAI0Y8m.jpg",
        };
        setImage(classToImageMap[race]);
    }, [race])

    //Handling submitting the session - calls put method & sends the values to it
    const handleSubmit = (e) => {
        e.preventDefault();
        const player = { name, race, playerClass, level, image };
        console.log(player);

        axios.put('http://localhost:4000/api/Character/' + id, player)
            .then((res) => {
                console.log("Edited: " + res.data);
                navigate('/Characters');
            })
            .catch((err) => {
                console.log(err);
            });

    }

    //Returning the layout for the page - allowing us to edit & change values
    return (
        <div style={bodyStyle}>
            <div style={editStyle}>
                <h3><b><u>Editing Character:</u></b> {name}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <img src={image} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' , border: '3px solid black'}}></img>
                    </div>
                    <div className="form-group">
                        <label>
                            <label><b><u>Edit Players Name:</u></b></label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <b><u>Edit Characters Race:</u></b>
                            <select
                                className="form-control"
                                value={race}
                                onChange={(e) => setRace(e.target.value)}>
                                <option value="" disabled>Select a race</option>
                                {availableRaces.map((raceOption, index) => (
                                    <option key={index} value={raceOption}>
                                        {raceOption}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <label><b><u>Edit Character Class:</u></b></label>
                            <select
                                className="form-control"
                                value={playerClass}
                                onChange={(e) => setClass(e.target.value)}>
                                <option value="" disabled>Select characters class</option>
                                {availableClasses.map((classOption, index) => (
                                    <option key={index} value={classOption}>
                                        {classOption}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <label><b><u>Edit Character Level:</u></b></label>
                            <input type="text"
                                className="form-control"
                                value={level}
                                onChange={(e) => { setLevel(e.target.value) }} />
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Edit Character Details"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditCharacter;