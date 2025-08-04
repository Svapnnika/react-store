import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import axios from "axios";
export default function Login() {
  const Navigate = useNavigate();
  const { user, setUser, users, setUsers, cart } = useContext(appContext);
  const [msg, setMsg] = useState();
   const [isLoading, setIsLoading] = useState(false);
  const API = process.env.REACT_APP_API;
  const handleSubmit = async () => {
    try {
      const url = `${API}/api/user/login`;
      const result = await axios.post(url, user);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setMsg("Something went wrong");
    }
     if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const found = users.find(
        (value) => value.email === user.email && value.password === user.password
      );
      
      if (found) {
        setMsg("Login successful! Redirecting...");
        setTimeout(() => {
          Object.keys(cart).length > 0 ? Navigate("/cart") : Navigate("/");
        }, 1000);
      } else {
        setMsg("Invalid email or password.");
      }
      
      setIsLoading(false);
    }, 500);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
   const validateForm = () => {
    if (!user.email || !user.password) {
      setMsg("Please fill in all fields");
      return false;
    }
    
    if (!isValidEmail(user.email)) {
      setMsg("Please enter a valid email address");
      return false;
    }
    
    if (user.password.length < 6) {
      setMsg("Password must be at least 6 characters long");
      return false;
    }
    
    return true;
  };
  return (
    <div className='container'>
      <h2>Login Form</h2>
      
      {msg && (
        <div className='msg'
        style={{backgroundColor: msg.includes('successful') ? '#4CAF50' : '#f44336'}}>
          {msg}
        </div>
      )}

      <p>
        <input 
          className='input'
          type="email" 
          placeholder="Email address"
          value={user.email || ''}
          onChange={(e) => setUser({...user, email: e.target.value})}
          disabled={isLoading}
          style={{width:'300px'}}
        />
      </p>
      
      <p>
        <input 
          className='input'
          type="password" 
          placeholder="Password"
          value={user.password || ''}
          onChange={(e) => setUser({...user, password: e.target.value})}
          disabled={isLoading}
          style={{width:'300px'}}
        />
      </p>
      
      <p>
        <button 
          className='login'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </p>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="../register" style={{ color: '#037cfdff', textDecoration: 'none' }}>
          New User? Register Here!
        </Link>
      </p>
    </div>
  );
}
