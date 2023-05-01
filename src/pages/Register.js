import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import FloatLabel from '../components/FloatLabel';
import {  useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [menuPosition, setMenuPosition] = useState({top: 0, left: 0})
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [value, setValue] = useState('')
  const [userrole, setUserrole] = useState('')
  const [records, setRecord] = useState([])
  const [otherrecords, setOtherRecord] = useState([])

  const nameRegex = /^[a-zA-Z ]+$/;
  let menuRef = useRef()

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenStudent(false)
        setOpenTeacher(false)
      }      
    };
    document.addEventListener("mousedown", handler)

    return() =>{
      document.removeEventListener("mousedown", handler)
    }

  })

  const handleClick = (event) => {
    setSelectedItem("")
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    })
  }

  const handleItemClick = (text, Role) => {
    setSelectedItem(text);
    setValue(text);
    setUserrole(Role)
  }

  useEffect(() => {
    document.title = "Register"
  }, [])

  function DropdownItem(props){
    return(
      <li className='dropdownItem' onClick={() => handleItemClick(props.text, props.Role)}>
        <a> {props.text} </a>
      </li>
    )
  }

  const handleUserNameChange = (event) => {setUsername(event.target.value)}
  const handlePasswordChange = (event) => {setPassword(event.target.value)}
  const handleCPasswordChange = (event) => {setCPassword(event.target.value)}
  const handleNameChange = (event) => {setName(event.target.value)}
  const handleSurnameChange = (event) => {setSurname(event.target.value)}
  const handleAgeChange = (event) => {setAge(event.target.value)}
  const handleEmailChange = (event) => {setEmail(event.target.value)}
  const handlePhoneChange = (event) => {setPhone(event.target.value)}

  async function onSubmit(event) {
    event.preventDefault()
    
    let url = ""
    let data = {}
    if (userrole === "user") {
      url = "http://127.0.0.1:5000/groups"
      data = {
        StudentId: username,
        Firstname: name,
        Surname: surname,
        Password: password,
        GroupId: Number(value),
        Email: email,
        Age: Number(age),
        Phone: phone,
      };
    } 
    else if (userrole === "admin") {
      url = "http://127.0.0.1:5000/teachers"
      data = {
        TeacherId: username,
        Password: password,
        Firstname: name,
        Surname: surname,
        Email: email,
        Age: Number(age),
        Phone: phone,
        SubjectId: value,
      };
    }
  
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } 
      navigate("/login")
  }

  useEffect(() => {
        fetch("http://127.0.0.1:5000/groups")
    .then((response)=>{
         return response.json(); 
     })
    .then((data)=>{
        setRecord(data)
     })
    .catch(err => console.log(err))
     }, [])

  useEffect(() => {
         fetch("http://127.0.0.1:5000/subjects")
     .then((response)=>{
          return response.json(); 
      })
     .then((data)=>{
      setOtherRecord(data)
      })
     .catch(err => console.log(err))
      }, [])

  return (
    <div className="form-block" ref={menuRef}>
      <div className="side-image"></div>
      <form method="#" className="log-in">
        <h1><span className="highlight">Register</span></h1>
        <FloatLabel Data="username" Value={username} Title="Username" Type="text" onChange={handleUserNameChange}/>
        <FloatLabel Data="password" Value={password} Title="Password" Type="password" onChange={handlePasswordChange}/>
        <FloatLabel Data="cpassword" Value={cpassword} Title="Confirm Password" Type="password" onChange={handleCPasswordChange} />
        <FloatLabel Data="name" Value={name} Title="Name" Type="text" onChange={handleNameChange}/>
        <FloatLabel Data="surname" Value={surname} Title="Surname" Type="text" onChange={handleSurnameChange}/>
        <FloatLabel Data="age" Value={age} Title="Age" Type="num" onChange={handleAgeChange}/>
        <FloatLabel Data="email" Value={email} Title="Email" Type="email" onChange={handleEmailChange}/>
        <FloatLabel Data="phone" Value={phone} Title="Phone" Type="tel" onChange={handlePhoneChange}/>
        <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger'>
          <a
            className="role-btn" 
            onClick={(event)=>{setOpenStudent(!openStudent);
            setOpenTeacher(false);
            handleClick(event);}}>
            I am Student
          </a>
          <a 
            className="role-btn"
            onClick={(event)=>{setOpenTeacher(!openTeacher);
            setOpenStudent(false);
            handleClick(event);}}>
            I am Teacher
          </a>
        </div>
        <div 
          className={`dropdown-menu ${openStudent || openTeacher ? 'active' : 'inactive'}`}
          style={{top: menuPosition.top, left: menuPosition.left}}>
          <ul>
            {openStudent ? (
              <>
              <h3 id="dropdown-title">Choose your group: {selectedItem || ''}</h3>
                {records.map((obj) => (
                <DropdownItem  key={obj.GroupId} text={obj.GroupId} Role="user"/>
            ))}
              </>
            ) : openTeacher ? (
              <>
              <h3 id="dropdown-title">Choose your subject: {selectedItem || ''}</h3>
                {otherrecords.map((obj) => (
                <DropdownItem  key={obj.SubjectId} text={obj.SubjectId} Role="admin"/>
            ))}
              </>
            ) : null}
          </ul>
        </div>
      </div>
        <Button Title="Sign up" Id="registrate-btn" onClick={onSubmit}/>
      </form>
    </div>
  )
}