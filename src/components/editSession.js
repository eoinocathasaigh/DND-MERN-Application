import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../images/SessionBackground.jpg'

const EditSession = () => {
    //Declaring & setting all the values for the specific session
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [campaign, setCampaign] = useState('');
    const [information, setInformation] = useState('');
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();

    //Styling this page
    const bodyStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: 'center', // Centers the image
        height: '90vh', // Sets the height to full viewport height
        overflow: 'auto'
    };

    const editStyle = {
        backgroundColor: 'white', // Corrected property name
        border: '4px solid black', // Black border
        borderRadius: '10px', // Rounded corners
        padding: '20px', // Padding inside the div
        maxWidth: '450px', // Restrict the width of the div
        margin: '20px auto', // Center the div and add vertical margin
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Adds a shadow for better visual appeal
    }

    //Handling moving to this page - sets the data automatically based on the session we choose
    useEffect(() => {
        axios.get('http://localhost:4000/api/session/' + id)
            .then((res) => {
                console.log("sucess " + res.data);
                setTitle(res.data.title);
                setCampaign(res.data.campaign);
                setInformation(res.data.information);
                setLogo(res.data.logo);
            })
            .catch((err) => { console.log(err) });
    }, [id]);

    //Handling submitting the session - calls put method & sends the values to it
    const handleSubmit = (e) => {
        e.preventDefault();
        const session = { title, campaign, information, logo };
        console.log(session);

        axios.put('http://localhost:4000/api/session/' + id, session)
            .then((res) => {
                console.log("Edited: " + res.data);
                navigate('/Sessions');
            })
            .catch((err) => {
                console.log(err);
            });

    }

    //Returning the layout for the page - allowing us to edit & change values
    return (
        <div style={bodyStyle}>
            <div style={editStyle}>
                <h3><b>Editing Session:</b> {title}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Edit Session Title: </label>
                        <input type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Edit Session Campaign: </label>
                        <input type="text"
                            className="form-control"
                            value={campaign}
                            onChange={(e) => { setCampaign(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Edit Session information: </label>
                        <input type="text"
                            className="form-control"
                            value={information}
                            onChange={(e) => { setInformation(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Edit Session Logo: </label>
                        <input type="text"
                            className="form-control"
                            value={logo}
                            onChange={(e) => { setLogo(e.target.value) }} />
                    </div>
                    <div>
                        <input type="submit" value="Edit Movie"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditSession;