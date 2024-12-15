import React, { useState, useContext, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import "./Reset.scss";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/auth/AuthContext";
import Snackbar from "@mui/material/Snackbar";

const Reset = () => {
  const { token } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { resetPassword, authError } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    token: token,
    newPassword: "",
    confirmNewPassword: "",
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      token: token, // Ensure the token is set in the formData
    }));
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errors, setErrors] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });
  const validateForm = () => {
    const newErrors = {
      newPassword: formData.newPassword.length < 8,
      confirmNewPassword: formData.confirmNewPassword !== formData.newPassword,
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
  const handleReset = async (e) => {
    e.preventDefault();
    //console.log(token);
    if (formData.newPassword !== formData.confirmNewPassword) {
      setPopupMessage("Passwords do not match");
      setShowPopup(false);
      setTimeout(() => setShowPopup(true), 0);
      return;
    }
    if (validateForm()) {
      const success = await resetPassword(formData);
      try {
        if (success) {
          setPopupMessage("Password reset successfully");
          setShowPopup(true);
        } else if (
          authError == "400" ||
          authError == "Invalid or expired token"
        ) {
          setPopupMessage("Invalid or expired token");
          setShowPopup(false);
          setTimeout(() => setShowPopup(true), 0);
        } else {
          setPopupMessage("Password reset failed");
          setShowPopup(false);
          setTimeout(() => setShowPopup(true), 0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="reset-container">
        <Fade>
          <div className="reset-form">
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
            <div className="reset-header">
              <h1>Reset Password</h1>
              <p className="reset-text">
                Enter your new password below to reset.
              </p>
            </div>

            <div className="reset-input">
              <FormControl variant="outlined">
                <TextField
                  id="outlined-basic"
                  placeholder="Enter your new password"
                  type={showPassword ? "text" : "password"}
                  className="reset input"
                  name="newPassword"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.newPassword}
                  error={errors.newPassword}
                  helperText={
                    errors.newPassword ? "New Password is required" : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "rgb(161, 161, 161)" }} />
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

            <div className="reset-input">
              <FormControl variant="outlined">
                <TextField
                  id="outlined-basic"
                  placeholder="Confirm your new password"
                  type={showPassword ? "text" : "password"}
                  className="reset input"
                  name="confirmNewPassword"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.confirmNewPassword}
                  error={errors.confirmNewPassword}
                  helperText={
                    errors.confirmNewPassword ? "New Password is required" : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "rgb(161, 161, 161)" }} />
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
              className="reset-button"
              onClick={handleReset}
            >
              Reset Password
            </Button>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default Reset;
