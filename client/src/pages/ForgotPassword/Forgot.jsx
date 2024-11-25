import React, { useState, useContext, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import "./Forgot.scss";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const Forgot = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errors, setErrors] = useState({
    email: false,
  });
  const validateForm = () => {
    const newErrors = {
      email: !validateEmail(formData.email),
    };

    setErrors(newErrors);
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      setPopupMessage("Please fill in all fields");
      setShowPopup(false); // Reset the showPopup state
      setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
      return false;
    }
    return !Object.values(newErrors).some((error) => error);
  };
  const handleForgot = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // add logic here
    }
  };
  return (
    <>
      <div className="forgot-container">
        <Fade>
          <div className="forgot-form">
            <div className="forgot-header">
              <h1>Forgot Password</h1>
              <p className="forgot-text">
                Enter your email address below to reset your password
              </p>
            </div>

            <div className="forgot-input">
              <FormControl variant="outlined">
                <TextField
                  id="outlined-basic"
                  placeholder="Enter your email"
                  type="text"
                  className="forgot input"
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.email}
                  error={errors.email}
                  helperText={errors.email ? "Email is required" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon style={{ color: "rgb(161, 161, 161)" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      color: "white",
                      fontFamily: "Segoe UI",
                      fontSize: "14px",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "rgb(161, 161, 161)" },
                  }}
                />
              </FormControl>
            </div>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="forgot-button"
              onClick={handleForgot}
            >
              Reset Password
            </Button>

            <div className="other-links">
              <Link className="registration" to="/login">
                Don't have an account? Register here
              </Link>
              <Link className="login" to="/login">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default Forgot;
