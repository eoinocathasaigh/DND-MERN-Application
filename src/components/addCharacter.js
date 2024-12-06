import axios from "axios";
import { useState } from "react";
import React from 'react';

const AddCharacter = () => {

    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [playerClass, setClass] = useState('');
    const [level, setLevel] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const player = {name,race,playerClass, level};
        console.log(player);

        axios.post('http://localhost:4000/api/CharacterCreator',player)
        .then((res)=>{console.log(res.data)})
        .catch();
    }

    return (
        <div>
            <h3>Hello from create component!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter Players name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Select Characters Race: </label>
                    <input type="text"
                        className="form-control"
                        value={race}
                        onChange={(e) => { setRace(e.target.value) }}/>
                        <label>
                        <b>Select Characters Race:</b>
                        <select name="selectedRace" value={race} onChange={(e) => { setRace(e.target.value) }}>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>Select Character Class: </label>
                    <input type="text"
                        className="form-control"
                        value={playerClass}
                        onChange={(e) => { setClass(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Enter Character Level: </label>
                    <input type="text"
                        className="form-control"
                        value={level}
                        onChange={(e) => { setLevel(e.target.value) }}/>
                </div>
                <div>
                    <input type="submit" value="Create Character"></input>
                </div>
            </form>
        </div>
    );
}
export default AddCharacter;