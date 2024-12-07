import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const AddCharacter = () => {

    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [playerClass, setClass] = useState('');
    const [level, setLevel] = useState('');
    const [image, setImage] = useState('');
    const [availableRaces, setAvailableRaces] = useState([]); // To store fetched races
    const [availableClasses, setAvailableClasses] = useState([]); // To store fetched classes
    const navigate = useNavigate();

    // Fetch options for races and classes from backend
    useEffect(() => {
        axios.get('http://localhost:4000/api/options')
            .then((res) => {
                setAvailableRaces(res.data.race || []);
                setAvailableClasses(res.data.classes || []);
            })
            .catch((error) => console.error('Error fetching options:', error));
    }, []);

    // Dynamically set the image based on the selected class
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const player = { name, race, playerClass, level, image};
        console.log(player);

        axios.post('http://localhost:4000/api/CharacterCreator', player)
            .then((res) => {
                console.log(res.data) 
                navigate('/Characters');
            })
            .catch();
    }

    return (
        <div>
            <h3>Welcome to the character Creation page</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        <label>Enter Players name: </label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <b>Select Characters Race:</b>
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
                        <label><b>Select Character Class:</b></label>
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
                        <label>Enter Character Level: </label>
                        <input type="text"
                            className="form-control"
                            value={level}
                            onChange={(e) => { setLevel(e.target.value) }} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Create Character"></input>
                </div>
            </form>
        </div>
    );
}
export default AddCharacter;