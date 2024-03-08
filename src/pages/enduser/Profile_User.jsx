/* eslint-disable no-unused-vars */
import { TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import Header from '../../ParentContComponents/Header';
import { NotificationContextManager } from '../../context/NotificationContext';

function Profile_User() {

  const [message, setMessage] = useState();
  
  const [ details,setDetails ] = useState({
    firstName:'',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    experienceInYears: 0,
    relavantExp: 0,
    highestQualification: '',
    skillSet: '',
    currentOrg: '',
    currentJobTitle: '',
    location: '',
    city: '',
    zipCode: 0,
    lastActiveDate: '',
  });
  const notification = useContext(NotificationContextManager);

  const handleDetails = (key,value) => {
    
    setDetails((prevDetails) => {
      return{
        ...prevDetails,
        [key]:value
      }
    })
  }
  
  const fetchUserDetails = async () => {
    const resp = await fetch("  ");
    const data = await resp.json();
  };


  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const updateDetails = async () => {

    try{
    const resp = await fetch('/user/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
    const data = await resp.json();
    console.log(data);
    /* notification(data) */
    }
    catch(err)
    {
      console.log(err.msg);
    }
  };

  const deleteProfile = async () => {
    try {
      const id = Number(localStorage.getItem("userid"));
      const response = await fetch(`http://your-api-url/user/update_user?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('User deleted successfully');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      throw error;
    }
  }

  return (
    <>
      <Header
        btn1="Find Jobs"
        btn2="My Dashboard"
        typeOfBtn="Logout"
        array={["Find Jobs", "My Profile", "My Dashboard", "Logout"]}
      />
      <div className="profile-page">
        <div className="user-details">
          <div className="top">
            <div className="image">
              <div className="left">
                <img src="" alt="" />
              </div>
              <form id="uploadForm" encType="multipart/form-data">
                <label className="btn input-btn" htmlFor="upload-resume">
                  Select Profile
                </label>
                <span> </span>
                <input
                  onChange={handleUpload}
                  style={{ display: "none" }}
                  id="upload-resume"
                  type="file"
                />
                <button className="btn" type="submit">
                  Upload
                </button>
              </form>
            </div>
            <div className="right">
              <div className="greeting">
                <h1>Welcome User..!</h1>
                <TextField
                  label="First Name"
                  id="outlined-basic"
                  variant="outlined" onChange={(e) => handleDetails("firstName",e.target.value)}
                  value={details.firstName}
                  ></TextField>
              </div>
            </div>
          </div>
          <div className="bottom">
          <TextField
  label="Last Name"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("lastName", e.target.value)}
  value={details.lastName}
/>
<TextField
  label="Mobile No"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("mobileno", e.target.value)}
  value={details.mobileNo}
/>
<TextField
  label="Email"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("email", e.target.value)}
  value={details.email}
/>
<TextField
  label="Password"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("password", e.target.value)}
  value={details.password}
/>
<TextField
  label="ExperienceInYears"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("experienceInYears", e.target.value)}
  type='number'
  value={details.experienceInYears}
/>
<TextField
  label="RelevantExp"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("relavantExp", e.target.value)}
  type='number'
  value={details.relavantExp}
/>
<TextField
  label="HighestQualification"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("highestQualification", e.target.value)}
  value={details.highestQualification}
/>
<TextField
  label="SkillSet"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("skillSet", e.target.value)}
  value={details.skillSet}
/>
<TextField
  label="CurrentOrg"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("currentOrg", e.target.value)}
  value={details.currentOrg}
/>
<TextField
  label="CurrentJobTitle"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("currentJobTitle", e.target.value)}
  value={details.currentJobTitle}
/>
<TextField
  label="Location"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("location", e.target.value)}
  value={details.location}
/>
<TextField
  label="City"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("city", e.target.value)}
  value={details.city}
/>
<TextField
  label="Zipcode"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("zipCode", e.target.value)}
  value={details.zipCode}
/>
<TextField
  label="Last Active Date"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("lastActiveDate", e.target.value)}
  value={details.lastActiveDate}
/>

            
            <button onClick={() => updateDetails()} className="btn">
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="delete-account d-flex">
        <h3>Delete My Profile</h3>
        <button className="btn" onClick={deleteProfile}>Delete</button>
      </div>
    </>
  );
}

export default Profile_User