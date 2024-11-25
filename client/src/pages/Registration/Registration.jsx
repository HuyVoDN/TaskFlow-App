import React, { useState, useContext, useEffect } from "react";
import "./Registration.scss";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/auth/AuthContext";
import {Fade} from "react-awesome-reveal";

const Registration = () => {
  const navigate = useNavigate();
  const { register, authError} = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (authError) {
      setPopupMessage(authError);
      setShowPopup(false);
      setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
      console.error("Registration failed");
      console.log(authError);
    }
  }, [authError]);
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
      username: formData.username === "",
      password: formData.password.length < 8,
      confirmPassword: formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);

    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      setPopupMessage("Fill in all fields");
      setShowPopup(false);
      setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
      return false;
    }

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      window.alert("Please fix all errors");
    }
    return !hasErrors;
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPopup(false);
  };
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const success = await register(formData);
        
        if (success) {
          setFormData({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
          
          setPopupMessage(`Successfully registered! Redirecting to login page...`);
          setShowPopup(true);
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else {
          setPopupMessage(authError);
          setShowPopup(false); // Reset the showPopup state
          setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
         
        }
      } catch (error) {
        setPopupMessage(error.message || "Login failed");
        setShowPopup(true);
        console.error("Login error:", error);
      }
    } else {
      setPopupMessage("Fill in all fields");
      setShowPopup(true);
      console.error("Fill in all fields");
    }

  };

  return (
    <div className="registration-container">
      <Fade>
      <div className="registration-form">
      <Snackbar
          open={showPopup}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={4000}
          onClose={() => setShowPopup(false)}
          message={popupMessage}
          ContentProps={{
            style: {
              fontSize: "17px",
              backgroundColor: "rgb(0, 0, 112)",
              fontFamily: "Segoe UI",
              fontWeight: "bold",
              height: "60px",
              textAlign: "center",
              borderRadius: "10px",
            },
          }}
        />
        <div className="registration-header">
        <h1>Registration</h1>
        <p>Create your account to get started!</p>
        </div>
        <FormControl variant="outlined">
          <TextField
            id="outlined-basic"
            placeholder="Username"
            type="text"
            className="username input"
            name="username"
            variant="outlined"
            onChange={handleChange}
            value={formData.username}
            error={errors.username}
            helperText={errors.username ? "Username is required" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon 
                  style={{color:"rgb(161, 161, 161)"}}/>
                </InputAdornment>
              ),
              sx: {color: 'white', fontFamily: 'Segoe UI', fontSize: '14px' }
            }}
            InputLabelProps={{
              style: { color: "rgb(161, 161, 161)" },
            }}
          />

          <TextField
            id="outlined-basic"
            type="email"
            className="email input"
            variant="outlined"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            value={formData.email}
            error={errors.email}
            helperText={errors.email ? "Invalid Email" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon 
                   style={{color:"rgb(161, 161, 161)"}}/>
                </InputAdornment>
              ),
              sx: {color: 'white', fontFamily: 'Segoe UI', fontSize: '14px' }
            }}
            InputLabelProps={{
              style: { color: "rgb(161, 161, 161)" },
            }}
          />
          <TextField
            id="outlined-basic"
            type="password"
            className="password input"
            placeholder="Password"
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
            name="password"
            error={errors.password}
            helperText={errors.password ? "Password too short" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon
                   style={{color:"rgb(161, 161, 161)"}} />
                </InputAdornment>
              ),
              sx: {color: 'white', fontFamily: 'Segoe UI', fontSize: '14px' }
            }}
            InputLabelProps={{
              style: { color: "rgb(161, 161, 161)" },
            }}
            
          />
          <TextField
            id="outlined-basic"
            type="password"
            className="confirm-password input"
            placeholder="Confirm Password"
            variant="outlined"
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
            error={errors.confirmPassword}
            helperText={errors.confirmPassword ? "Password not matching" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon
                   style={{color:"rgb(161, 161, 161)"}}/>
                </InputAdornment>
              ),
              sx: {color: 'white', fontFamily: 'Segoe UI', fontSize: '14px' }
            }}
            InputLabelProps={{
              style: { color: "rgb(161, 161, 161)" },
            }}
  
          />
        </FormControl>
        <div className="link">
          <Link className="login" to="/login">
            Already have an account? Login
          </Link>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="registration-button"
          onClick={handleRegistration}
        >
          Register
        </Button>
      </div>
      </Fade>
    </div>
  );
};

export default Registration;
