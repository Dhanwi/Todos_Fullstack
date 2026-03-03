import React from 'react'

export default function SignIn() {
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
