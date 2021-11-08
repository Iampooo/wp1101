import React, {useState} from 'react';
import "./Buttons.css";

const Buttons = ({content, onButtonClick, type, operator}) =>{
    return <div className= {`btn ${content === '0' ? 'zero' : ''} ${type || ""} ${content === operator ? 'on' : ''}`} onClick={onButtonClick(content)}>{content}</div>;
}

export default Buttons;