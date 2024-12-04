import CharacterItems from "./CharacterItems";

const Characters = (props)=>{
    //Passing data from parent to child using props
    //Will repeat over itself and print all the items we have to print
    return props.myCharacter.map(
        (character)=>{
            //Takes each individual object and splits up into different items we can access
            return <CharacterItems myCharacter={character} key={character._id} Reload={props.ReloadData}/>
        }
    )
}

export default Characters;