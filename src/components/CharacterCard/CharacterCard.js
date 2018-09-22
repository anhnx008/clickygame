import React from "react";
import './Character.css'



const CharacterCard = props => (
    <div className="characterCard" value={props.id} onClick={() => props.handleClick(props.id)}>
        <div className="img-container">
            <img alt={props.name} src={props.image}></img>
        </div>        
    </div>
);

export default CharacterCard;
