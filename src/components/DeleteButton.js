import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"

function DeleteButton({ username }) {
  const navigate = useNavigate();

  const handleClick = () => {
      Swal.fire({
        title: 'Are you sure you want to delete this account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#32CD32',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) 
        {
          Swal.fire(
            'Deleted!',
            'Your account has been deleted',
            'success'
          ).then(() => {
            let url =  "";
            if(localStorage.getItem("role") ==="user"){
              url = `http://127.0.0.1:5000/student/${username}`
            } else{
              url = `http://127.0.0.1:5000/teachers/${username}`
            }
            const token = window.localStorage.getItem('token')
            const headers = new Headers();
            headers.set('Authorization', `Basic ${token}`)
            headers.set('content-type', 'application/json');
            const options = {
              method: 'DELETE',
              headers,
            };

            fetch(url, options)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                localStorage.clear();
                window.location.reload()
                navigate('/login')
              })
          });
        }
      })  
  }

  return (
    <div>
      <button id="delete-btn" onClick={handleClick}>Delete </button>
    </div>
  )
}

export default DeleteButton;
