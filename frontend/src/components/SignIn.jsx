import React, { use, useState } from 'react'
import axios from 'axios';


export default function SignIn() {
      const [credential, setCredential] = useState([])
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      

      const handleEmail=(e)=>{
        setEmail(e.target.value)
      }
      const handlePassword = (e)=>{
        setPassword(e.target.value)
      }

      const handleSubmit=(e)=>{
        e.preventDefault();
        const payload = {email, password}
        axios.post(`${import.meta.env.VITE_API_URL}/todo/signIn`, payload)
        .then((res)=>{
            setCredential(res.data)
        })
        .catch(console.error)
      }
      
    return (
      <div>
          <form onSubmit={handleSubmit}>
              <label>Your Email:
                  <input value={email} onChange={handleEmail}/>
              </label>
              <label>Password:
                  <input value={password} onChange={handlePassword}/>
              </label>
              <input type='submit' className=' border-2 border-amber-900' />
          </form>
      </div>
    )
}
