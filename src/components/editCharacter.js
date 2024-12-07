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
    const [image, setImage] = useState('');
    const [availableRaces, setAvailableRaces] = useState([]); // To store fetched races
    const [availableClasses, setAvailableClasses] = useState([]); // To store fetched classes
    const navigate = useNavigate();

    //Handling moving to this page - sets the data automatically based on the session we choose
    useEffect(()=>{
        axios.get('http://localhost:4000/api/Character/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setName(res.data.name);
            setRace(res.data.race);
            setClass(res.data.playerClass);
            setLevel(res.data.level);
        })
        .catch((err)=>{console.log(err)});
    },[id]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/options')
            .then((res) => {
                setAvailableRaces(res.data.race || []);
                setAvailableClasses(res.data.classes || []);
            })
            .catch((error) => console.error('Error fetching options:', error));
    }, []);

    useEffect(() => {
        const classToImageMap = {
            "Dragonborn": "https://i.pinimg.com/736x/1b/2b/21/1b2b215cad3448912075b9b2852db6fe.jpg",
            "Dwarf": "https://www.gmbinder.com/images/6oHntST.png",
            "Elf": "https://149844032.v2.pressablecdn.com/wp-content/uploads/2021/04/lorracyn__the_half_elf_ranger_by_ohheyitskaylak_deesm7m-fullview.jpg",
            "Gnome": "https://i.pinimg.com/736x/05/a7/46/05a746d4d42df4a51f65154aff8e1d43.jpg",
            "Half-Elf": "https://d1vzi28wh99zvq.cloudfront.net/images/19187/352703.jpg",
            "Half Orc": "https://www.dndbeyond.com/avatars/thumbnails/6/466/420/618/636274570630462055.png",
            "Halfling": "https://i.pinimg.com/736x/7e/62/12/7e62126c49580e19ea158bdfd61237b5.jpg",
            "Human": "https://dmingdad.com/wp-content/uploads/dungeons-and-dragons-human-fighter.png",
            "Tiefling": "https://pbs.twimg.com/media/C4HRsJJWQAI0Y8m.jpg",
        };
        setImage(classToImageMap[race] || ""); // Default to an empty string if no mapping
    }, [race]);

    //Handling submitting the session - calls put method & sends the values to it
    const handleSubmit = (e) => {
        e.preventDefault();
        const player = {name,race,playerClass,level, image};
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
                    <label>
                        <label>Edit Players name: </label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <b>Edit Characters Race:</b>
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
                        <label><b>Edit Character Class:</b></label>
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
                        <label>Edit Character Level: </label>
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
    );
}
export default EditCharacter;