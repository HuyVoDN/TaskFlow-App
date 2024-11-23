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
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <Box className="profile-page">
        <Paper elevation={3} className="profile-container">
          <Grid container spacing={3}>
            {/* Profile Header */}
            <Grid item xs={12} className="profile-header">
              <Box className="avatar-section">
                <Avatar
                  src={profileData.avatar}
                  className="profile-avatar"
                  alt={profileData.username}
                />
                <IconButton className="camera-icon">
                  <PhotoCameraIcon />
                </IconButton>
              </Box>
              {!isEditing ? (
                <IconButton className="edit-button" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : (
                <Box className="action-buttons">
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
            </Grid>

            {/* Profile Info */}
            <Grid item xs={12} className="profile-info">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={profileData.username}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profileData.email}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={profileData.firstName}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={profileData.lastName}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default UserProfile;
