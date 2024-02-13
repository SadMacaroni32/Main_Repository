/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "../styles/Auth.css";


function ProfileEditForm({ handleClose }) {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const [updateData, setUpdateData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    profilePicture: null, // Add profilePicture to state
  });

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchUserData = async () => {
        try {
            // Get user ID from local storage
            const userId = localStorage.getItem('userId');

            if (!userId) {
                console.error('User ID not found in local storage');
                // Handle this case, for example, redirect the user to login
                return;
            }

            const response = await fetch(`http://localhost:8085/api/v1/auth/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);

                // Set the initial state of updateData with the existing user data
                setUpdateData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    userName: userData.userName,
                    // Add more fields as needed
                    profilePicture: userData.profilePicture,
                });

                // If the profile picture is in binary format, convert it to a data URL
                if (userData.profilePicture) {
                    const base64 = btoa(String.fromCharCode(...new Uint8Array(userData.profilePicture)));
                    const dataUrl = `data:image/avif;base64,${base64}`;
                    setUpdateData((prevData) => ({
                        ...prevData,
                        profilePicture: dataUrl,
                    }));
                }
            } else {
                console.error('Failed to fetch user data', response.status, response.statusText);
                // Handle this error as needed
            }
        } catch (error) {
            console.error('Unexpected error during user data fetch', error);
            // Handle unexpected errors
        }
    };

    fetchUserData();
}, []);


const handleInputChange = (e, isFile = false) => {
  const { name, value, files } = e.target;

  if (isFile) {
      const selectedFile = files[0];

      // Check if the selected file size exceeds the allowed limit (5 MB)
      const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes

      if (selectedFile && selectedFile.size > maxFileSize) {
          // Show an error message or handle it as needed
          console.error('File size exceeds the allowed limit (5 MB)');
          return;
      }

      // Update the profile picture state
      setUpdateData((prevData) => ({
          ...prevData,
          [name]: selectedFile,
      }));

      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => {
          setImagePreview(reader.result);
      };

      if (selectedFile) {
          reader.readAsDataURL(selectedFile);
      } else {
          setImagePreview(null);
      }
  } else {
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  }
};
  

  const handleProfilePictureUpload = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', updateData.profilePicture);

      const response = await fetch(`http://localhost:8085/api/v1/auth/upload-pp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Profile picture uploaded successfully');
      } else {
        console.error('Profile picture upload failed', response.status, response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Unexpected error during profile picture upload', error);
      // Handle unexpected errors
    }
  };

  const handleUpdate = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');

        const updateFields = {};

        // Check if each field has been modified and add it to the updateFields object
        if (updateData.firstName !== userData.firstName) {
            updateFields.firstName = updateData.firstName;
        }

        if (updateData.lastName !== userData.lastName) {
            updateFields.lastName = updateData.lastName;
        }

        if (updateData.userName !== userData.userName) {
            updateFields.userName = updateData.userName;
        }

        // Add more fields as needed

        const response = await fetch(`http://localhost:8085/api/v1/auth/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updateFields),
        });

        if (response.ok) {
            console.log('Profile updated successfully');
            handleClose();
        } else {
            console.error('Update failed', response.status, response.statusText);
            // Handle update failure
        }
    } catch (error) {
        console.error('Unexpected error during update', error);
        // Handle network or unexpected errors
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload profile picture
    await handleProfilePictureUpload();

    // Update general profile information
    await handleUpdate();
  };

  const handleCancel = () => {
    handleClose();
  }

  const handleChooseFileClick = () => {
    // Trigger the file input when the custom button is clicked
    fileInputRef.current.click();
  };

  return (
    <div className="Prof2-wrapper">
      <div className="Prof2-left">
        <label htmlFor="profilePicture">Profile Picture</label>
        <button className="TeamA-button" onClick={handleChooseFileClick}>
          Choose File
        </button>
        {/* Hidden file input */}
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          ref={fileInputRef}
          onChange={(e) => handleInputChange(e, true)}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            style={{ width: '100px', height: '100px', marginTop: '10px' }}
          />
        )}
        <h4>{updateData.firstName} {updateData.lastName}</h4>
        <p>Position name</p>
      </div>
      <div className="Prof2-right">
        {userData && Object.keys(userData).length > 0 && ( // Check if userData is not null and not an empty object
          <div className="Prof2-info">
            <h3>Profile Information</h3>
            <form onSubmit={handleSubmit} className="Prof2-info_data">
              {/* Existing form fields */}
              <div className="Prof2-data">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={updateData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
                <label htmlFor="email">Email</label>
                <div className="data">
                  {userData && <p>{userData.email}</p>}
                </div>
              </div>
              <div className="Prof2-data">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={updateData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={updateData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                />
              </div>
              {/* Update and Cancel buttons */}
              <div className="Prof2-buttons">
                <button className="submit-button" type="submit">
                  Update
                </button>
                <Link to="#">
                  <button onClick={handleCancel} className="cancel-button">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileEditForm;