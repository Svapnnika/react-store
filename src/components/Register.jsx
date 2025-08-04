import React from "react";
import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { appContext } from "../App";
export default function Register() {
  const { user, setUser, users, setUsers} = useContext(appContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = process.env.REACT_APP_API;
  const handleSubmit = async () => {
    try {
      const url = `${API}/api/user/register`;
      const result = await axios.post(url, user);
      Navigate("/login")
    } catch (err) {
      console.log(err);
      setMsg("Something went wrong");
    }
    const found = users.find((value) => value.email === user.email);
    if (found) {
      setMsg("User already exists with this email!");
    } else {
      setUsers([...users, user]);
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        Navigate("/login");
      }, 1500);
    }
  };
  // const handleDelete = (email) => {
  //   setUsers(users.filter((value) => value.email !== email));
  // };
   const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
   const validateForm = () => {
    if (!user.name || !user.email || !user.password) {
      setMsg("Please fill in all fields");
      return false;
    }
    
    if (user.name.length < 2) {
      setMsg("Name must be at least 2 characters long");
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
      <div className='con'>
      <h2 style={{textAlign:'center'}}>Registration Form</h2>
      {msg && (
        <div className='msg'
        style={{backgroundColor: msg.includes('successful') ? '#4CAF50' : '#f44336'}}>
          {msg}
        </div>
      )}
      
      <p>
        <input className='input'
          type="text" 
          placeholder='Enter name (min 2 characters)'
          value={user.name || ''}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </p>
      
      <p>
        <input className='input'
          type="email" 
          placeholder='Email address'
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      
      <p>
        <input className='input'
          type="password" 
          placeholder='Password (min 6 characters)'
          value={user.password || ''}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </p>
      
      <p>
        <button className='reg'
          onClick={handleSubmit}
        >
          Register
        </button>
      </p>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="../login" style={{ color: '#007bff', textDecoration: 'none' }}>
          Already a member? Login here!
        </Link>
      </p>
      </div>
    </div>
  );
}
