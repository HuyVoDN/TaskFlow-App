import React, { useState, useContext } from 'react';
import './Registration.scss';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      email: !validateEmail(formData.email),
      username: formData.username === '',
      password: formData.password.length < 8,
      confirmPassword: formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);

    const allFieldsFilled = Object.values(formData).every((field) => field !== '');

    if (!allFieldsFilled) {
      window.alert('Please fill in all fields');
      return false;
    }

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      window.alert('Please fix all errors');
    }
    return !hasErrors;
  };
  const handleClose = (event, reason) =>{
    if (reason === 'clickaway') {
      return;
    }
    setShowPopup(false);
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    let valid = true;
    try {
     
      if (validateForm()) {
        const response = await Axios.post('http://localhost:3000/auth/register', {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
        setFormData({
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({
          email: false,
          username: false,
          password: false,
          confirmPassword: false,
        });
        console.log('Successfully registered');
        setPopupMessage(`Successfully registered! Redirecting to login page...`);
        setShowPopup(true);
        setTimeout(() => {
          navigate('/login')}, 4000);

      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      setPopupMessage(`Registration failed: ${error.response.data.message}`);
      setShowPopup(true);
      console.log(error.response);
    };
  };

  return (
    <div className='registration-container'>
      <div className='registration-form'>
        <h1>Register Your Account!</h1>
        <Snackbar
        open={showPopup}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration= {4000}
        onClose={handleClose}
        message={popupMessage}
        ContentProps={{style: {fontSize: '17px', backgroundColor: 'rgb(0, 0, 112)', fontFamily:'Segoe UI', fontWeight: 'bold', height: '60px', textAlign: 'center', borderRadius: '10px'} }}
        />
        <FormControl variant='outlined'>
          <TextField
            id="outlined-basic"
            type='text'
            className='username input'
            label="Username"
            name='username'
            variant="outlined"
            onChange={handleChange}
            value={formData.username}
            error={errors.username}
            helperText={errors.username ? 'Username is required' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="outlined-basic"
            type='email'
            className='email input'
            label="Email"
            variant="outlined"
            onChange={handleChange}
            name='email'
            value={formData.email}
            error={errors.email}
            helperText={errors.email ? 'Invalid Email' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-basic"
            type='password'
            className='password input'
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
            name='password'
            error={errors.password}
            helperText={errors.password ? 'Password too short' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}

          />
          <TextField
            id="outlined-basic"
            type='password'
            className='confirm-password input'
            label="Confirm Password"
            variant="outlined"
            onChange={handleChange}
            value={formData.confirmPassword}
            name='confirmPassword'
            error={errors.confirmPassword}
            helperText={errors.confirmPassword ? 'Password not matching' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <div className='link'><Link className='login' to='/login'>Already have an account? Login</Link></div>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className='registration-button'
          onClick={handleRegistration}>
          Login
        </Button>

      </div>
    </div>
  )
}

export default Registration