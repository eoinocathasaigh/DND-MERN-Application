import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/characterBackground.jpg'

const AddCharacter = () => {

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

    const addStyle = {
        backgroundColor: 'lightblue', 
        border: '4px solid black', 
        borderRadius: '10px', 
        padding: '20px', 
        maxWidth: '350px', 
        margin: '20px auto', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    };

    //Fetch options for races and classes from the database
    useEffect(() => {
        axios.get('http://localhost:4000/api/options')
            .then((res) => {
                setAvailableRaces(res.data.race);
                setAvailableClasses(res.data.classes);
            })
            .catch((error) => console.error('Error fetching options:', error));
    }, []);

    //Method for setting the image for the characters selected race
    useEffect(() => {
        const raceToImage = {
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
        setImage(raceToImage[race]); // Default to an empty string if no mapping
    }, [race]);

    //Saving the created character
    const handleSubmit = (e) => {
        e.preventDefault();
        const player = { name, race, playerClass, level, image };
        console.log(player);

        axios.post('http://localhost:4000/api/CharacterCreator', player)
            .then((res) => {
                console.log(res.data)
                navigate('/Characters');
            })
            .catch();
    }

    //Basic body of the page - enables user to fluidly create the character
    return (
        <div style={bodyStyle}>
            <div style={addStyle}>
                <h3><b><u>Welcome to Character Creation</u></b></h3>
                <p>This is one of the best parts of DND, designing who you want to be in game<br />Sometimes this can be confusing, but dont worry heres exactly what you'll need to make one.</p>
                <ul>
                    <li><b>Character Name:</b> This one is pretty simple, give yourself a name. It can be a silly or as serious as you want</li>
                    <li><b>Character Race:</b> There are many races in dnd, each with their own benefits. But dont worry, we've limited things down to the basic ones. This should help you better decide on your characters lineage</li>
                    <li><b>Character Class:</b> This is where things get good. What kind of fighter do you want to be? A masterful swordsman or a mysterious wizard? The choice is yours!</li>
                    <li><b>Character Level:</b> What level is your character? Here you can decide what your characters skill is exactly</li>
                </ul>
            </div>
            <div style={addStyle}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <label ><b><u>Enter Players name:</u></b> </label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <b><u>Select Characters Race:</u></b>
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
                            <label><b><u>Select Character Class:</u></b></label>
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
                            <label><b><u>Enter Character Level:</u></b> </label>
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
        </div>
    );
}
export default AddCharacter;