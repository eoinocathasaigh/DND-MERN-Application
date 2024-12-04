import { useState } from "react";//Need to import useState first to use it
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Create = ()=>{
    //We do everything in this class thanks to Axios
    //Allows us to handle http requests & responses
    //Axios allows us to send asynchronous http requests(get, post)
    //Sends them to endpoints to handle responses
    const[title, setTitle] = useState('');
    const[campaign, setCampaign] = useState('');
    const[information, setInformation] = useState('');
    const[logo, setLogo] = useState('');
    const navigate = useNavigate();

    //Used to handle when our submit button is pressed
    //Takes in the element, prevents it from repeating
    //Then it logs it to the console
    //Modified version now adds it to the server too
    const handleSubmit = (e) => {
        //Prevents the function from being called multiple times
        e.preventDefault();
        //Outputting the title entered by the user to the console
        const session = {title, campaign, information, logo};
        console.log(session);

        axios.post('http://localhost:4000/api/SessionTracker', session)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.data));

        navigate('/Sessions');
    }
    return(
        <div>
            {/*Getting the title for the session and saving it to the server*/}
            <h3>Create a new session works</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Add a Session Title: </label>
                    <input type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) =>{setTitle(e.target.value)}}></input>
                </div>
            </form>
            {/*Getting the relevant capaign for the session and saving it to the server*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Add a campaign for the session: </label>
                    <input type="text"
                    className="form-control"
                    value={campaign}
                    onChange={(e) =>{setCampaign(e.target.value)}}></input>
                </div>
            </form>
            {/*Getting the information for the session and saving it to the server*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Add the sessions information: </label>
                    <input type="text"
                    className="form-control"
                    value={information}
                    onChange={(e) =>{setInformation(e.target.value)}}></input>
                </div>
            </form>
            {/*Getting the logo for the relevant session*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Add the sessions logo: </label>
                    <input type="text"
                    className="form-control"
                    value={logo}
                    onChange={(e) =>{setLogo(e.target.value)}}></input>
                </div>
                <div>
                    <input type="submit" value="Save Details"></input>
                </div>
            </form>
        </div>
    )
}

export default Create;