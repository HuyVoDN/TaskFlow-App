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
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

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
    return !Object.values(newErrors).some((error) => error);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    let valid = true;
    try {
      if (validateForm()) {
        //add the registration logic before these lines
        
        navigate('/login');
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
        console.log('Registration successful');
        window.alert('Registration successful');
      } else {
        console.error('Validation failed');
      }
    } catch (error) {
      console.error('Registration failed');
    };
  };

  return (
    <div className='registration-container'>
      <div className='registration-form'>
        <h1>Register Your Account!</h1>
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