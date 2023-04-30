import React, { useEffect } from 'react';
import BioInput from '../components/BioInput';
import TableItem from '../components/TableItem';
import Button from '../components/Button';
import profile from "../assets/profile.png"

export default function Profile(){
    useEffect(() => {
        document.title = "User Profile"
     }, []);
    return (
        <>
            <h1 id="profile-title"><span className="highlight">Welcome to the, student profile!</span></h1>
                <div className="wrapper"> 
                    <div className="bio-block">
                    <img src={profile} alt="profile logo"/>
                    <h3>Alaska11</h3>
                    <div className="inputs-block">
                        <BioInput Label="Name" Name="Kornelia" Type="text" Id="name"/>
                        <BioInput Label="Surname" Name="Drozd" Type="text" Id="surname"/>
                        <BioInput Label="Group" Name="216" Type="number" Id="group"/>
                        <BioInput Label="Age" Name="18" Type="number" Id="age"/>
                        <BioInput Label="Phone" Name="+380958984251" Type="tel" Id="phone"/>
                        <BioInput Label="Email" Name="sindrella975@gmail.com" Type="email" Id="email"/>
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
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>  
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
                                <TableItem Id="1" Sbj="Theory of Information" Teacher="petroPu" Value="5" Date="25/08/2004"/>
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