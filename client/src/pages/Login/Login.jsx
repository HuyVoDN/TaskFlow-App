import './Login.scss';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(!validateEmail(value));
    if (validateEmail(value)) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;
    try {
      if (!email && !password) {
        setError(true);
        console.error('Please fill in all fields');
        window.alert("Please fill in all fields");
        return;
      }

      if (!password) {
        setPasswordError(true);
        console.error('Password is required');
        valid = false;
      } 
      else {
        setPasswordError(false);
      }

      if (!validateEmail(email)) {
        setInvalidEmail(true);
        console.error('Invalid email address');
        return;
      }

      if (valid) {
        console.log('Form submitted');
        setError(false);
        setEmail('');
        setPassword('');
        setInvalidEmail(false);
      }
    }
    catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='login-form'>
          <h1>Login To Your Account</h1>
          <FormControl variant='outlined'>
            <TextField
              value={email}
              onChange={handleEmailChange}
              id="outlined-email"
              type='email'
              label="Email"
              placeholder='Enter your email'
              helperText={invalidEmail ? "Invalid email address" : " "}
              error={invalidEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              style={{ width:'20rem' }}
            />
          </FormControl>
          <FormControl>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant='outlined'
              placeholder='Enter your password'
              helperText={passwordError ? "Fill in your password" : " "}
              error={passwordError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                ),
              }}
              style={{ width: '20rem', alignSelf: 'center' }}
            />
          </FormControl>

          <div className='forgot'>
            <Link className='link' to='/contactus'>Forgot your password?</Link>
          </div>
          <div className='registration'>
            <Link className='link' to='/registration'>Don't have an account? Register here</Link>
          </div>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='login-button'
            onClick={handleLogin}>
            Login
          </Button>

        </div>
      </div>
    </>

  )
}

export default Login