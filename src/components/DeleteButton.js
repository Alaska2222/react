import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteButton({ username }) {
  const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();
  const handleDelete = () => {
    const url = `http://127.0.0.1:5000/student/${username}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))
      }
    };
    if (confirmed) {
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          navigate('/');
          localStorage.clear();
        })
    }
  }

  const handleClick = () => {
    if (confirmed) {
      handleDelete();
    } else {
      alert("Are you sure you want to delete this user?");
      setConfirmed(true);
    }
  }

  return (
    <div>
      <button id="delete-btn" onClick={handleClick}>Delete </button>
    </div>
  )
}

export default DeleteButton;
