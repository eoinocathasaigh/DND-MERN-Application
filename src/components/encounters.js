import EncounterItems from "./encounterItems";

const Encounters = (props)=>{
    //Passing data from parent to child using props
    return props.myEncounter.map(
        (encounter)=>{
            //Takes each individual object and splits up into different items we can access
            return <EncounterItems myEncounter={encounter} key={encounter._id} Reload={props.ReloadData}/>
        }
    )
}

export default Encounters;