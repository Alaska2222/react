import React, { useEffect } from 'react';

export default function Login(){
    useEffect(() => {
        document.title = "Login"
     }, []);
    return <h1> Login page</h1>
}