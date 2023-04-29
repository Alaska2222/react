import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import FloatLabel from '../components/FloatLabel';

export default function Register() {
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [menuPosition, setMenuPosition] = useState({top: 0, left: 0});
  const [selectedItem, setSelectedItem] = useState(null);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpenStudent(false);
        setOpenTeacher(false); 
      }      
    };
    document.addEventListener("mousedown", handler);

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  const handleClick = (event) => {
    setSelectedItem("");
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };

  const handleItemClick = (text) => {
    setSelectedItem(text);
  }

  useEffect(() => {
    document.title = "Register"
  }, []);

  function DropdownItem(props){
    return(
      <li className='dropdownItem' onClick={() => handleItemClick(props.text)}>
        <a> {props.text} </a>
      </li>
    );
  }
  
  return (
    <div className="form-block" ref={menuRef}>
      <div className="side-image"></div>
      <form method="#" className="log-in">
        <h1><span className="highlight">Register</span></h1>
        <FloatLabel Data="username" Title="Username" Type="text" />
        <FloatLabel Data="password" Title="Password" Type="password" />
        <FloatLabel Data="cpassword" Title="Confirm Password" Type="password" />
        <FloatLabel Data="name" Title="Name" Type="text" />
        <FloatLabel Data="surname" Title="Surname" Type="text" />
        <FloatLabel Data="age" Title="Age" Type="num" />
        <FloatLabel Data="email" Title="Email" Type="email" />
        <FloatLabel Data="phone" Title="Phone" Type="tel" />
        <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger'>
          <a class="role-btn" onClick={(event)=>{setOpenStudent(!openStudent); setOpenTeacher(false); handleClick(event);}}>I am Student</a>
          <a class="role-btn" onClick={(event)=>{setOpenTeacher(!openTeacher); setOpenStudent(false); handleClick(event);}}>I am Teacher</a>
        </div>

        <div className={`dropdown-menu ${openStudent || openTeacher ? 'active' : 'inactive'}`} style={{top: menuPosition.top, left: menuPosition.left}}>

          <ul>
            {openStudent ? (
              <>
              <h3 id="dropdown-title">Choose your group: {selectedItem || ''}</h3>
                <DropdownItem text={"Group#1"} />
                <DropdownItem text={"Group#2"} />
                <DropdownItem text={"Group#3"} />
              </>
            ) : openTeacher ? (
              <>
              <h3 id="dropdown-title">Choose your subject: {selectedItem || ''}</h3>
                <DropdownItem text={"Subject#1"} />
                <DropdownItem text={"Subject#2"} />
                <DropdownItem text={"Subject#3"} />
              </>
            ) : null}
          </ul>
        </div>

      </div>
        <Button Title="Sign up" Id="registrate-btn" />
      </form>
    </div>
  )
}
