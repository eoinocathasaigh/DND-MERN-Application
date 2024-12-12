import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/SessionBackground.jpg'

const CreateSession = () => {
    //Setting variables for this class & setting up the methods to get them
    const [title, setTitle] = useState('');
    const [campaign, setCampaign] = useState('');
    const [information, setInformation] = useState('');
    const [logo, setLogo] = useState('');
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
        backgroundColor: 'white',
        border: '4px solid black',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '450px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }

    //Used to handle when our submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        const session = { title, campaign, information, logo };
        console.log(session);

        axios.post('http://localhost:4000/api/SessionTracker', session)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.data));

        //Automatically navigating the user back to the sessions page when theyre done
        navigate('/Sessions');
    }
    return (
        <div style={bodyStyle}>
            <div style={addStyle}>
                <h3><b><u>Create New Session</u></b></h3>
                <p>Here you can create & log the details that go into your in DND<br />You'll need the following:</p>
                <ul>
                    <li><b>Session title:</b> Your sessions should have a nice name, something recognisable for you should you need to look back at a specific point</li>
                    <li><b>Campaing:</b> To help better with sorting, give your session a name corresponding with whichever campaign you're currently in</li>
                    <li><b>Session Details:</b> Describe what happened in this session, you can be as brief or as detailed as you like!</li>
                    <li><b>Session Logo:</b> Give your session a logo to help it stick out a bit more</li>
                </ul>
            </div>
            <div style={addStyle}>
                {/*Getting the title for the session and saving it to the server*/}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><b><u>Add a Session Title:</u></b> </label>
                        <input type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}></input>
                    </div>
                </form>
                {/*Getting the relevant capaign for the session and saving it to the server*/}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><b><u>Add a campaign for the session:</u></b> </label>
                        <input type="text"
                            className="form-control"
                            value={campaign}
                            onChange={(e) => { setCampaign(e.target.value) }}></input>
                    </div>
                </form>
                {/*Getting the information for the session and saving it to the server*/}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><b><u>Add the sessions information:</u></b> </label>
                        <input type="text"
                            className="form-control"
                            value={information}
                            onChange={(e) => { setInformation(e.target.value) }}></input>
                    </div>
                </form>
                {/*Getting the logo for the relevant session*/}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><b><u>Add the sessions logo:</u></b> </label>
                        <input type="text"
                            className="form-control"
                            value={logo}
                            onChange={(e) => { setLogo(e.target.value) }}></input>
                    </div>
                    <div>
                        <input type="submit" value="Save Details"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSession;