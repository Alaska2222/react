import React, { useState, useEffect } from 'react';
import BioInput from '../components/BioInput';
import profile from "../assets/nupl.jpg"
import Button from '../components/Button';
import DeleteButton from '../components/DeleteButton';
import {SearchBar} from '../components/SearchBar';
import { SearchResultsList } from '../components/SearchResultsList';

export default function Admin(){

    const [results, setResults] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    let [records, setRecord] = useState([])
    useEffect(() => {
        const fetchData = () => {
            try {
                fetch(`http://127.0.0.1:5000/teachers/${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(username + ':' + password)
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const { Firstname, Surname, Age, Email, Phone, SubjectId } = data.Teacher;
    
                    setName(Firstname);
                    setSurname(Surname);
                    setAge(Age);
                    setEmail(Email);
                    setPhone(Phone);
                    setSubject(SubjectId);
    
                    document.title = "Admin Profile";
    
                    return fetch(`http://127.0.0.1:5000/teachers/${username}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ' + btoa(username + ':' + password)
                        }
                    });
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setRecord(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);
    return (
        <>
            <h1 id="profile-title"><span className="highlight">Welcome to the, admin profile!</span></h1>
                <div className="wrapper-admin"> 
                    <div className="bio-block">
                        <img id="admin-logo"src={profile} alt="profile logo"/>
                        <h3>{username}</h3>
                        <div className="inputs-block">
                        <BioInput Label="Name" Name={name} Type="text" Id="name"/>
                        <BioInput Label="Surname" Name={surname} Type="text" Id="surname"/>
                        <BioInput Label="Subject" Name={subject} Type="text" Id="subject"/>
                        <BioInput Label="Age" Name={age} Type="number" Id="age"/>
                        <BioInput Label="Phone" Name={phone} Type="tel" Id="phone"/>
                        <BioInput Label="Email" Name={email} Type="email" Id="email"/>
                        </div>

                        <div className ="button-group">
                            <Button Id="update-btn" Title="Update"/>
                            <DeleteButton username={username} />
                        </div>
                    </div>
                        <div className="journal-block">
                            <div className='search-bar-container'>
                                <SearchBar setResults={setResults}/>
                                <SearchResultsList results={results}/>
                            </div>
                        </div>
            </div>
        </>
    )
}