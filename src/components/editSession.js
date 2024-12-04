import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [campaign, setCampaign] = useState('');
    const [information, setInformation] = useState('');
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/session/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setTitle(res.data.title);
            setCampaign(res.data.campaign);
            setInformation(res.data.information);
            setLogo(res.data.logo);
        })
        .catch((err)=>{console.log(err)});
    },[id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const session = {title,campaign,information,logo};
        console.log(session);

        axios.put('http://localhost:4000/api/session/'+id, session)
        .then((res)=>{
            console.log("Edited: "+res.data);
            navigate('/Sessions');
        })
        .catch((err)=>{
            console.log(err);
        });
      
    }

    return (
        <div>
            <h3>Hello from edit component!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Session Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Edit Session Campaign: </label>
                    <input type="text"
                        className="form-control"
                        value={campaign}
                        onChange={(e) => { setCampaign(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Edit Session information: </label>
                    <input type="text"
                        className="form-control"
                        value={information}
                        onChange={(e) => { setInformation(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Edit Session Logo: </label>
                    <input type="text"
                        className="form-control"
                        value={logo}
                        onChange={(e) => { setLogo(e.target.value) }}/>
                </div>
                <div>
                    <input type="submit" value="Edit Movie"></input>
                </div>
            </form>
        </div>
    );
}
export default Edit;