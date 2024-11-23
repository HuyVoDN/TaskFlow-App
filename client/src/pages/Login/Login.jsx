import "./Login.scss";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/auth/AuthContext";
import Snackbar from "@mui/material/Snackbar";

const styles = theme => ({
  input :{
    color:white
    
  }
})
const Login = () => {
  const navigate = useNavigate();
  const { login, authError } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (authError) {
      setPopupMessage(authError);
      setShowPopup(false);
      setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
      console.error("Login failed");
      console.log(authError);
    }
  }, [authError]);

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
      password: formData.password === "",
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
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const success = await login(formData);

        if (success) {
          setTimeout(() =>
            setFormData({
              email: "",
              password: "",
            })
          );
          setErrors({
            email: false,
            password: false,
          });
          setPopupMessage(
            "Successfully logged in! Redirecting to profile page..."
          );
          setShowPopup(true);
          setTimeout(() => {
            navigate("/profile"); // change this to /:email, not just /profile
          }, 4000);
        } else {
          setPopupMessage(authError);
          setShowPopup(false); // Reset the showPopup state
          setTimeout(() => setShowPopup(true), 0); // Set it to true again after a short delay
          console.log(authError);
        }
      } else {
        console.error("Form not submitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
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
          <div className="login-header">
            <h1>Welcome</h1>
            <p> Enter your credentials to login to your account </p>
          </div>

          <FormControl variant="outlined">
            <TextField
              value={formData.email}
              onChange={handleChange}
              className="input-fields"
              name="email"
              id="outlined-email"
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              helperText={errors.email ? "Invalid email address" : " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                    style={{ color: "white" }} />
                  </InputAdornment>
                ),
                sx: {color: 'white', fontFamily: 'Segoe UI', fontSize: '14px' }
              }}
              style={{ width: "20rem" }}
              
            />
            <TextField
              value={formData.password}
              onChange={handleChange}
              name="password"
              id="outlined-password"
              type={showPassword ? "text" : "password"}       
              variant="outlined"
              placeholder="Enter your password"
              error={errors.password}
              helperText={errors.password ? "Fill in your password" : " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon 
                    style={{ color: "white" }}/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {color: 'white', fontFamily: 'Segoe UI', fontSize: '14px' }
              }}
              style={{ width: "20rem", alignSelf: "center" }}
            />
          </FormControl>

          <div className="forgot">
            <Link className="link" to="/contactus">
              Forgot your password?
            </Link>
          </div>
          <div className="registration">
            <Link className="link" to="/registration">
              Don't have an account? Register here
            </Link>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="login-button"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
