import {useRouter} from 'next/router'; 
import React, { useEffect, useState } from 'react'
  

export default function Admin  ()  {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleLogin = () => {

        if (email === '' || password === '') {
            setError('Email and password are required.');
            return;
          }
        fetch('http://localhost:3200/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), 
        })
        .then((response) => {
            if (response.status === 200) {
              
              router.push('/adminpanel');
            } else {
              
              console.log('Login failed. Incorrect email or password.');
            }
            return response.json();
          })
          .catch((error) => {
            console.error('An error occurred while processing the login:', error);
          });
      };
    
  return (
    <div>
        <h1>Login</h1>
        <form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e)=> setEmail(e.target.value)} 
            />
            <input 
                type="password"
                placeholder='Password'
                value={password}
                className="form-control"
                onChange={(e)=> setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}> Admin Login</button>
        </form>
    </div>
  )
}


