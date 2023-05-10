import React, { useState, useEffect } from 'react';
import BioInput from '../components/BioInput';
import profile from "../assets/nupl.jpg"
import Button from '../components/Button';
import DeleteButton from '../components/DeleteButton';
import { AnimatedPage } from '../components/AnimatedPage';
import Swal from "sweetalert2"
import TableMui from '../components/TableMui';

export default function Admin(){

    const [results, setResults] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const [otherrecords, setOtherRecord] = useState([])
    let [records, setRecord] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
        
          const subjectsResponse = await fetch("http://127.0.0.1:5000/subjects", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const subjectsData = await subjectsResponse.json();
          setOtherRecord(subjectsData);
    
          const headers = new Headers();
          headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
          headers.set('content-type', 'application/json');
          const teacherResponse = await fetch(`http://127.0.0.1:5000/teachers/${username}`, {
            method: 'GET',
            headers,
          });
    
          if (!teacherResponse.ok) {
            throw new Error('Network response was not ok');
          }
    
          const teacherData = await teacherResponse.json();
    
          const { Firstname, Surname, Age, Email, Phone, SubjectId } = teacherData.Teacher;
    
          setName(Firstname);
          setSurname(Surname);
          setAge(Age);
          setEmail(Email);
          setPhone(Phone);
          setSubject(SubjectId);
          setRecord(teacherData);
    
          document.title = "Admin Profile";
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchData();
    }, []);
    
    const handleUpdateClick = () => {
        if (isDisabled) {
          setIsDisabled(false);
        } else {
          const updatedTeacher = {
            Firstname: name,
            Surname: surname,
            Email: email,
            Age: Number(age),
            Phone: phone,
            SubjectId: subject,
          };
          const headers = new Headers();
          headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
          headers.set('content-type', 'application/json');
          fetch(`http://127.0.0.1:5000/teachers/${username}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatedTeacher),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }else{
                setIsDisabled(true);
                Swal.fire(
                    'Success!',
                    'Teacher was updated!',
                    'success'
                  )
              }
              return response.json();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
         
         
        }
      };
      

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (!isDisabled) {
          if (name === 'subject') {
            setSubject(value);
          } else {
            switch (name) {
              case 'name':
                setName(value);
                break;
              case 'surname':
                setSurname(value);
                break;
              case 'age':
                setAge(value);
                break;
              case 'email':
                setEmail(value);
                break;
              case 'phone':
                setPhone(value);
                break;
              default:
                break;
            }
          }
        }
      };
      
      const options = otherrecords.map((record) => (
        <option key={record.SubjectId} value={record.SubjectId}>
          {record.SubjectId}
        </option>
      ));
      
      return (
        <AnimatedPage>
          <h1 id="profile-title">
            <span className="highlight">Welcome to the, admin profile!</span>
          </h1>
          <div className="wrapper-admin">
            <div className="bio-block">
              <img id="admin-logo" src={profile} alt="profile logo" />
              <h3>{username}</h3>
              <div className="inputs-block">
                <BioInput
                  Label="Name"
                  Name={name}
                  Type="text"
                  Id="name"
                  Disabled={isDisabled}
                  onClick={handleInputChange}
                />
                <BioInput
                  Label="Surname"
                  Name={surname}
                  Type="text"
                  Id="surname"
                  Disabled={isDisabled}
                  onClick={handleInputChange}
                />
            
                <BioInput
                  Label="Age"
                  Name={age}
                  Type="number"
                  Id="age"
                  Disabled={isDisabled}
                  onClick={handleInputChange}
                />
                <BioInput
                  Label="Phone"
                  Name={phone}
                  Type="tel"
                  Id="phone"
                  Disabled={isDisabled}
                  onClick={handleInputChange}
                />
                <BioInput
                  Label="Email"
                  Name={email}
                  Type="email"
                  Id="email"
                  Disabled={isDisabled}
                  onClick={handleInputChange}
                />
                {isDisabled ? (
                  <BioInput
                    Label="Subject"
                    Name={subject}
                    Type="text"
                    Id="subject"
                    Disabled={isDisabled}
                    onClick={handleInputChange}
                  />
                ) : (
                  <select
                    name="subject"
                    id="subject"
                    value={subject}
                    onChange={handleInputChange}
                  >
                    {options}
                  </select>
                )}
              </div>
      
              <div className="button-group">
                <Button Id="update-btn" Title="Update" onClick={handleUpdateClick} />
                <DeleteButton username={username} />
              </div>
            </div>
            <div className="journal-block">
              <div className="table-nui-container">
                <TableMui />
              </div>
            </div>
          </div>
        </AnimatedPage>
      );
}