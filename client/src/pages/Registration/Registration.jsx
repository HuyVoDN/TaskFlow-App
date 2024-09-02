import React, { useState, useContext } from 'react';
import './Registration.scss';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';


const Registration = () => {

  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [userName, setUserName] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(!validateEmail(value));
    if (validateEmail(value)) {
      setInvalidEmail(false);
    }
    else {
      setInvalidEmail(true);
    }
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    let valid = true;
    try {
      console.log(invalidUsername);
      console.log(invalidEmail);
      console.log(invalidPassword);
      if (email == '' && password == '' && userName == '') {
        setError(true);
        console.error('Please fill in all fields');
        window.alert("Please fill in all fields");
        valid = false;
      }
      if (!password || password.length < 3) {
        setInvalidPassword(true);
        valid = false;
        console.error('Invalid password');
      } 
      else 
      {
        setInvalidPassword(false);
      }
      if (email == '' || !validateEmail(email)) {
        setInvalidEmail(true);
        setError('email empty');
        console.error('Invalid Email');
        valid = false
      } 
      else {
        setInvalidEmail(false);
      }
      if (userName == '') 
      {
        setInvalidUsername(true);
        console.error('Missing Username');
        valid = false;
      }
      else {
        setInvalidUsername(false);
      }
  
      if(valid){
        console.log('Registration successful');
        setError('');
        setEmail('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
        setInvalidEmail(false);
        setInvalidUsername(false);
        setInvalidPassword(false);
       
      }
  
    } 
    catch (e) 
    {
      setError(e);
      console.error(e);
    }
    
  };

  return (
    <div className='registration-container'>
      <div className='registration-form'>
        <h1>Register Your Account!</h1>
        <form onSubmit={handleRegistration}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={userName}
            error={invalidUsername}
            helperText={invalidUsername ? 'Username is required' : ''}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={invalidEmail}
            helperText={invalidEmail ? 'Invalid Email' : ''}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={invalidPassword}
            helperText={invalidPassword ? 'Invalid ass password' : ''}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='show-password'>
            <input type='checkbox' onClick={handleClickShowPassword} />
            <label>Show Password</label>
          </div>
          <button type='submit'>Register</button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Registration