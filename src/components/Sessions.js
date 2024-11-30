import SessionItem from "./SessionItem";

const Sessions = (props)=>{
    //Passing data from parent to child using props
    //Will repeat over itself and print all the items we have to print
    return props.mySessions.map(
        (session)=>{
            //Takes each individual object and splits up into different items we can access
            return <SessionItem mySessions={session} key={session._id} Reload={props.ReloadData}/>
        }
    )
}

export default Sessions;