/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import Header from "../../ParentContComponents/Header";
import { useEffect,useState } from "react";

function Profile_Admin({ typeOfUser }) {

  const [message, setMessage] = useState();

  const [ admindetails,setAdminDetails ] = useState({
    "adminid":"",
    "firstname": "",
    "lastname": "",
    "address": "",
    "website": "",
    "adminImg": "",
    "companyName": "",
    "role":"",
    "location":""
  });

  const handleAdminDetails = (key,value) => {

    setAdminDetails((prevDetails) => {
      return{
        ...prevDetails,
        [key]:value,
      }
    });

  }


  const fetchUserDetails = async () => {
    const resp = await fetch(" ");
    const data = await resp.json();

  };


  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("file", file);

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateDetails = async () => {
    const resp = await fetch("/admin/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admindetails),
    });
    const data = await resp.json();
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Header
        btn2="Manage Requests"
        btn1="My DashBoard"
        typeOfBtn="Logout"
        array={["Manage Requests", "My_Profile", "My DashBoard", "Logout"]}
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
                <h1>Welcome {typeOfUser}..!</h1>
                <TextField
                  label="Adminid"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{readOnly:true}}></TextField>
              </div>
            </div>
          </div>
          <div className="bottom">
            <TextField
              label="First Name"
              id="outlined-basic"
              variant="outlined"
              type="text"
              value={admindetails.firstname}
              onChange={(e) => handleAdminDetails("firstname",e.target.value)}
            />
            <TextField
              label="Last Name"
              id="outlined-basic"
              variant="outlined"
              type="text"
              value={admindetails.lastname}
              onChange={(e) => handleAdminDetails("lastname",e.target.value)}
            />
            <TextField
              label="Address"
              id="outlined-basic"
              variant="outlined"
              type="text"
              value={admindetails.address}
              onChange={(e) => handleAdminDetails("address",e.target.value)}
            />
            <TextField
              label="Website"
              id="outlined-basic"
              variant="outlined"
              type="text"
              value={admindetails.website}
              onChange={(e) => handleAdminDetails("website",e.target.value)}
            />
            <TextField
              label="Company Name"
              id="outlined-basic"
              variant="outlined"
              type="text"
              value={admindetails.companyName}
              InputProps={{readOnly:true}}
            />
          </div>
          <button onClick={() => updateDetails()} className="btn">
              Update Profile
            </button>
        </div>
      </div>
      <div className="delete-account d-flex">
        <h3>Delete My Profile</h3>
        <button className="btn">Delete</button>
      </div>
    </>
  );
}

export default Profile_Admin;
