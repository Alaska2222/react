import React, { useState, useEffect } from 'react';
import BioInput from '../components/BioInput';
import TableItem from '../components/TableItem';
import Button from '../components/Button';
import profile from "../assets/profile.png"

export default function Profile(){
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [group, setGroup] = useState('')

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    let [records, setRecord] = useState([])
    useEffect(() => {
        const fetchData = () => {
            try {
                fetch(`http://127.0.0.1:5000/student/${username}`, {
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
                    const { Firstname, Surname, Age, Email, Phone, GroupId } = data.Student;
    
                    setName(Firstname);
                    setSurname(Surname);
                    setAge(Age);
                    setEmail(Email);
                    setPhone(Phone);
                    setGroup(GroupId);
    
                    document.title = "User Profile";
    
                    return fetch(`http://127.0.0.1:5000/students/${username}`, {
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
                    console.log(records)
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
            <h1 id="profile-title"><span className="highlight">Welcome to the, student profile!</span></h1>
                <div className="wrapper"> 
                    <div className="bio-block">
                    <img src={profile} alt="profile logo"/>
                    <h3>{username}</h3>
                    <div className="inputs-block">
                        <BioInput Label="Name" Name={name} Type="text" Id="name"/>
                        <BioInput Label="Surname" Name={surname} Type="text" Id="surname"/>
                        <BioInput Label="Group" Name={group} Type="number" Id="group"/>
                        <BioInput Label="Age" Name={age} Type="number" Id="age"/>
                        <BioInput Label="Phone" Name={phone} Type="tel" Id="phone"/>
                        <BioInput Label="Email" Name={email} Type="email" Id="email"/>
                    </div>
                    <div className ="button-group">
                        <Button Id="update-btn" Title="Update"/>
                        <Button Id="delete-btn" Title="Delete"/>
                    </div>
                    </div>
                    <div className="grades-block">
                        <div className="table-block">
                        <table>
                            <thead>
                            <tr>
                                <th><a href="//" className="sort-by" id="num">№</a></th>
                                <th><a href="//" className="sort-by" id="sbj">Subject</a></th>
                                <th><a href="//" className="sort-by" id="teacherID">Teacher</a></th>
                                <th><a href="//" className="sort-by" id="value">Mark</a></th>
                                <th><a href="//" className="sort-by" id="date">Date</a></th>
                            </tr>
                            </thead>
                            <tbody>
                            {records.map((obj) => (
                                <TableItem key={obj.MarkId} Id={obj.MarkId} Sbj={obj.SubjectId} Teacher={obj.TeacherId} 
                                Value={obj.Value} Date={obj.DateId} />
                            ))}
                            </tbody>
                            </table>
                        </div>
                        <div className="stats-block">
                            <div className="diagram"></div>
                            <div className="diagram"></div>
                            <div className="diagram"></div>   
                        </div>  
                </div>
            </div>
        </>
    )
}