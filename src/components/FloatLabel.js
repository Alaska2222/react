import React from 'react';

export default function FloatLabel(props){
    return (
        <div className="floating-label">
            <input className="input" placeholder={props.Title} type={props.Type} name={props.Data} id={props.Data} required/>
            <label htmlFor={props.Data}>{props.Data}:</label>
        </div>)      
}