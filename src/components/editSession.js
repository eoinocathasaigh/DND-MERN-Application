//This file exists for the purpose of handling movies
import React from "react";
//useParams - hook to get dynamic parameters of the current route
//- We're going to use it to get the id from the movie url
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
//useNavigate - hook enabling navigation to different routes programmatically
//- We use it after the user submits their edited movie. Redirects user to the read page
import { useNavigate } from "react-router-dom";

const editSession = ()=>{
    const {id} = useParams();
    const[title, setTitle] = useState('');
    const[campaign, setCampaign] = useState('');
    const[information, setInfo] = useState('');
    const[logo, setLogo] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        //Makes http request method at a specific movie url
        //When we navigate to this page now the following happens:
        //- The data from the movie we wish to edit is moved in
        axios.get('http://localhost:4000/api/SessionTracker/'+id)
        .then((res)=>{
            console.log(res.data);
            setTitle(res.data.title);
            setCampaign(res.data.campaign);
            setInfo(res.data.information);
            setLogo(res.data.logo);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleSubmit = (e) => {
        //Prevents the function from being called multiple times
        e.preventDefault();
        //Outputting the title entered by the user to the console
        const session = {title, campaign, information, logo};
        console.log(session);

        //This will effectively re route us back the original movies page when we're done editing
        axios.put('http://localhost:4000/api/SessionTracker/'+id, session)
        .then((res)=>{console.log(res.data);
            navigate('/SessionTracker');
        })
        .catch((err) => console.log(err.data))
    }
    return(
        //Simple component to be displayed in app.js
        //Each field is handled using reacts useState
        //Each input will be logged to the console upon submission
        <div>
            {/*Getting the title for our movie and saving it to the server*/}
            <h3>Hello from the Eidt component</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Edit Session Title: </label>
                    <input type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) =>{setTitle(e.target.value)}}></input>
                </div>
            </form>
            {/*Getting the campaign for the session and saving it to the server*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Edit session campaign: </label>
                    <input type="text"
                    className="form-control"
                    value={year}
                    onChange={(e) =>{setCampaign(e.target.value)}}></input>
                </div>
            </form>
            {/*Getting the information for the session and saving it to the server*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Edit the sessions information: </label>
                    <input type="text"
                    className="form-control"
                    value={poster}
                    onChange={(e) =>{setInfo(e.target.value)}}></input>
                </div>
            {/*Getting the logo for the session and saving it to the server*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Change the logo for this campaign: </label>
                    <input type="text"
                    className="form-control"
                    value={year}
                    onChange={(e) =>{setLogo(e.target.value)}}></input>
                </div>
            </form>
                <div>
                    <input type="submit" value="Save Details"></input>
                </div>
            </form>
        </div>
    )
}

export default editSession;