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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        overflow: 'auto'
    };

    const editStyle = {
        backgroundColor: 'white',
        border: '4px solid black',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '450px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
    //Similar layout to adding a new session
    return (
        <div style={bodyStyle}>
            <div style={editStyle}>
                <h3><b><u>Editing Session:</u></b> {title}</h3>
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
                        <input type="submit" value="Edit Session"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditSession;