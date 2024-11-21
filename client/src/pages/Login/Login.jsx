import './Login.scss';
import React, { useState, useContext, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../Context/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, authError } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {
      email: !validateEmail(formData.email),
      password: formData.password === '',
    };

    setErrors(newErrors);
    const allFieldsFilled = Object.values(formData).every((field) => field !== '');

    if (!allFieldsFilled) {
      setPopupMessage('Please fill in all fields');
      setShowPopup(false); // Reset the showPopup state
      setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
      return false;
    }
    return !Object.values(newErrors).some((error) => error);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      if (validateForm()) {
        const success = await login(formData);
        if (success){

          navigate('/profile');
        setFormData({
          email: '',
          password: ''
        });
        setErrors({
          email: false,
          password: false,
        });
        setPopupMessage('Successfully logged in! Redirecting to profile page...');
        setShowPopup(true);
        setTimeout(() => {
          navigate('/profile');
        }, 4000);
        }
        else{
          setPopupMessage(authError);
          setShowPopup(false); // Reset the showPopup state
          setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
          console.log(authError);
        }
        
      } else {
        console.error('Form not submitted');
      }
    }
    catch (error) {
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
              value={formData.email}
              onChange={handleChange}
              name='email'
              id="outlined-email"
              type='email'
              label="Email"
              placeholder='Enter your email'
              error={errors.email}
              helperText={errors.email ? "Invalid email address" : " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              style={{ width: '20rem' }}
            />
            <TextField
              value={formData.password}
              onChange={handleChange}
              name='password'
              id="outlined-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant='outlined'
              placeholder='Enter your password'
              error={errors.password}
              helperText={errors.password ? "Fill in your password" : " "}
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