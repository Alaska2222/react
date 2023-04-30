import React, { useState, useEffect } from 'react';
import BioInput from '../components/BioInput';
import TableItem from '../components/TableItem';
import Button from '../components/Button';
import profile from "../assets/profile.png"
import Piechart from '../components/PieChart';
import Linechart from '../components/LineChart';

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
    
    const calculateAverageByTeacher = (records) => {
        const averages = {};
      
        records.forEach((record) => {
          const { TeacherId, Value } = record;
      
          if (!averages[TeacherId]) {
            averages[TeacherId] = { sum: 0, count: 0 };
          }
      
          averages[TeacherId].sum += parseInt(Value);
          averages[TeacherId].count++;
        });
      
        for (let teacherId in averages) {
          averages[teacherId].average = parseInt(averages[teacherId].sum) / parseInt(averages[teacherId].count);
        }
        
        let arr = []
        Object.keys(averages).map((TeacherId) => {
            arr.push(averages[TeacherId].average)
        });
        
        const labels = Object.keys(averages);
        let labels_new = []
        for (let i = 0; i < labels.length; i++) {
            if (Number.isInteger(arr[i])) {
                labels_new.push(`${labels[i]}(${arr[i]})`);
              } else {
                labels_new.push(`${labels[i]}(${arr[i].toFixed(2)})`);
              }
          }
        return [labels_new, arr];
      };

      const [labels, arr] = calculateAverageByTeacher(records);


   
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
                            <div className="diagram" >
                            <Piechart series={arr} labels={labels}/>
                            </div>
                            <div className="diagram">
                            <Linechart records={records} />
                             </div>  
                        </div>  
                </div>
            </div>
        </>
    )
}