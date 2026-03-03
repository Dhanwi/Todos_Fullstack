import React from 'react'
import { useState } from 'react'

export default function SignUP() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    
  return (
    <div>
        <form>
            <label>Username:
                <input value={username}/>
            </label>
            <label>Email:
                <input value={email}/>
            </label>
            <label>Password:
                <input value={password}/>
            </label>
        </form>
    </div>
  )
}
