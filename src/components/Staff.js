import React, { useEffect } from 'react';

export default function Staff(){
    useEffect(() => {
        document.title = "Our Staff"
     }, []);
    return <h1> Staff page</h1>
}