import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import { json } from 'react-router-dom';

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState('')
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const fetchData =(value) =>{
    fetch(`http://127.0.0.1:5000/students`, {
        method: 'GET',
        headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}
    })       
    .then((response) => response.json())
    .then((json) => {
        const results = json.filter((user)=> {
            return user && user.StudentId && user.StudentId.toLowerCase().includes(value.toLowerCase())
        })
        setResults(results)
    })
}
   const handleChange =(value) => {
        setInput(value)
        fetchData(value)
   }           
                
  return (
    <div className='input-wrapper'>
        <FaSearch id='search-icon'/>
        <input placeholder='Choose student...'
         value={input}
         onChange={(e)=> handleChange(e.target.value)}/>
    </div>
  )
}

