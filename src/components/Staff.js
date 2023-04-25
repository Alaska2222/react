import React, { useEffect, useState } from 'react'
import Teacher from './Teacher';
import "../styles/staff.css"


export default function Staff(){
    let [records, setRecord] = useState([])
    useEffect(() => {
        document.title = "Our Staff"
        fetch("http://127.0.0.1:5000/teachers")
    .then((response)=>{
         return response.json(); 
     })
    .then((data)=>{
        setRecord(data)
     })
    .catch(err => console.log(err))
     }, [])

    
    

    return (
     <div>
        <h1><span className="highlight">GradeMaster`s Teaching Staff</span></h1>
        <div className="teacher-list">
            <Teacher Username="petroPu" Name="Petro" Surname="Pukach" Age="50" Phone="+380958984251" Email="PetroPukacg@gmail.com"/>
            {records.map((obj) => (
                <Teacher key={obj.TeacherId} Username= {obj.TeacherId} Name={obj.Firstname} Surname={obj.Surname}
                 Age={obj.Age} Subject={obj.SubjectId} Phone={obj.Phone} Email={obj.Email} />
            ))}
        </div>
    </div>
    );
}