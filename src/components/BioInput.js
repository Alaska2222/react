import React from 'react';

export default function BioInput({Label, Name, Type, Id }){
    return (
        <div className="bio-input">
            <label htmlFor={Id}>{Label}:</label>
            <input className="input" placeholder={Name} type={Type} id={Id} disabled />
        </div>)       
}

