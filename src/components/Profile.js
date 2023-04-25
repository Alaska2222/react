import React, { useEffect } from 'react';

export default function Profile(){
    useEffect(() => {
        document.title = "User Profile"
     }, []);
    return <h1> Profile page</h1>
}