import React, {useState, useEffect} from 'react'
import { AiOutlineUser, AiOutlineCrown } from "react-icons/ai";
import{BsCircleFill} from 'react-icons/bs'

export const ChatSideBar = () => {
  const [records, setRecord] = useState([]);

  useEffect(() => {
    document.title = 'Chat';


    fetch('http://localhost:5000/chat')
      .then((response) => response.json())
      .then((data) => {
        setRecord(data);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className='sidebar'>
      <h1>List of Users </h1>
      <div className='user-list'>
        {records.map((obj) => (
          <User
            key={obj.id}
            Username={obj.Username}
            role={obj.Status}
          />
        ))}
      </div>
    </div>
  );
};

function User(props) {

  return (
    <div className='users'>
      {props.role === 'admin' ? (
        <AiOutlineCrown size={30} color='#FFB300' />
      ) : (
        <AiOutlineUser size={26} />
      )}
      <h2>{props.Username}</h2>
      <BsCircleFill
        size={8}
        id='user-status'
      />
    </div>
  );
}

export default User;