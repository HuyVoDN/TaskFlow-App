import React, { useState, useContext } from "react";
import "./Profile.scss";
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "johndoe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    userRole: "User",
    status: "active",
    password: "password", // make sure this is changable and its hashed when changed, and it should be unseen on the profile.
    profilePicture: null,
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, profilePicture: reader.result });
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="profile-header">
          <h1>My Profile</h1>
          <IconButton onClick={handleEdit} className="icon-container">
            <EditIcon className="edit-icon"></EditIcon>
          </IconButton>
        </div>
        <div className="profile-picture" > 
          <Avatar
            alt="Profile Picture"
            src={profileData.profilePicture}
            sx={{ width: 100, height: 100 }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            className="img-input"
            onClick={handleProfilePictureChange}
          />
        </div>
        
        <div className="profile-details">
          <TextField
            label="Username"
            value={profileData.username}
            disabled={!isEditing}
  
          />
          <TextField
            label="Email"
            value={profileData.email}
            disabled={!isEditing}
            
          />
          <TextField
            label="First Name"
            value={profileData.firstName}
            disabled={!isEditing}
          />
          <TextField
            label="Last Name"
            value={profileData.lastName}
            disabled={!isEditing}
            
          />
          <TextField
            label="User Role"
            value={profileData.userRole}
            disabled
            
          />
          <TextField
            label="Password"
            value={profileData.password}
            disabled={!isEditing}
            
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
