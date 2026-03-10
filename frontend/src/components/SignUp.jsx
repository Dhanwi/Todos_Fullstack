import axios from 'axios';
import React, { use } from 'react'
import { useState } from 'react'

export default function SignUP() {
    const [credential, setCredential] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleUserName =(e)=>{
        setUsername(e.target.value)
    }
    const handlePassword =(e)=>{
        setPassword(e.target.value)
    }
    const handleEmail =(e)=>{
        setEmail(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const payload = {email, password, userName: username}
        axios.post(`${import.meta.env.VITE_API_URL}/todo/signUp`, payload)
        .then((res)=>{
            setCredential(res.data)
        })
        .finally(()=>{
            setEmail('');
            setPassword('');
            setUsername('');
        })
        .catch(console.error);
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input value={username} onChange={handleUserName}/>
            </label>
            <label>Email:
                <input value={email} onChange={handleEmail}/>
            </label>
            <label>Password:
                <input value={password} onChange={handlePassword}/>
            </label>
            <input type='submit' className=' border-2 border-amber-900'/>
        </form>
    </div>
  )
}
