/* eslint-disable no-unused-vars */
import { TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import Header from '../../ParentContComponents/Header';
import { NotificationContextManager } from '../../context/NotificationContext';
import { collection,doc,getDoc,onSnapshot,updateDoc } from 'firebase/firestore';
import { db,storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Profile_User() {

  const [message, setMessage] = useState();
  
  const [ details,setDetails ] = useState({
    name: '',
    mobileNo: '',
    email: '',
    password: '',
    location: '',
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
  
 

  const handleUpload = async (event) => {
      
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("file", file);

    const {auth} = JSON.parse(localStorage.getItem("hireup"));

    const id = "profilepic"
    const fileref = ref(storage, `Users/${auth.id}/resumes/${id}`);
    
    uploadBytes(fileref, file).then((snapshot) => {
      getDownloadURL(fileref).then(async (url) => {
        const coll =  collection(db,"Hireup_Db","EndUsers","User_Db");
        const docref = doc(coll,`${auth.id}`);

        await updateDoc(docref,{
          "img":url,
        });

        notification("Updated Profile Pic","success");

      },() => notification("Failed To Upload Image","error"));
    },() => notification("Failed To Upload Image","error"));
    
    event.target.value = null;
  };


  const updateDetails = async () => {
    try{
      const {auth} = JSON.parse(localStorage.getItem("hireup"));

    const coll1 = collection(db,"Hireup_Db","EndUsers","User_Db");
    const docref1 = doc(coll1,`${auth.id}`);

    await updateDoc(docref1,{
      "name":details.name,
      "phoneno":details.mobileNo,
    })

    notification("Updated Profile Details","success");
    }
    catch(err){
      console.log(err);
      notification("Failed to Update Profile Details","success");
    }
  };

  const deleteProfile = async () => {
    
  }

  useEffect(() => {

    const {auth} = JSON.parse(localStorage.getItem("hireup"));

      const coll1 = collection(db,"Hireup_Db","EndUsers","User_Db");
      const docref1 = doc(coll1,`${auth.id}`);
      
      onSnapshot(docref1,(docu) => {
        if(docu.exists())
        {
          setDetails({
            email:docu.data().email,
            name:docu.data().name,
            mobileNo:docu.data().phoneno,
            img:docu.data().img,
            password:docu.data().password,
            img:docu.data().img,
          })
        }
      })

  }, [])

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
                <img src={ details.img ? details.img : "" } alt="" />
              </div>
              <form id="uploadForm" encType="multipart/form-data">
                <label className="btn input-btn" htmlFor="upload-resume">
                  Upload
                </label>
                <span> </span>
                <input
                  onChange={handleUpload}
                  style={{ display: "none" }}
                  id="upload-resume"
                  type="file"
                />
              </form>
            </div>
            <div className="right">
              <div className="greeting">
                <h1>Welcome User..!</h1>
                <TextField
                  label="Name"
                  id="outlined-basic"
                  variant="outlined" onChange={(e) => handleDetails("name",e.target.value)}
                  value={details.name}
                  ></TextField>
              </div>
            </div>
          </div>
          <div className="bottom">
  
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
  value={details.email}
  InputProps={{readOnly:true}}
/>
<TextField
  label="Password"
  id="outlined-basic"
  variant="outlined"
  value={details.password}
  InputProps={{readOnly:true}}
/>
<TextField
  label="Location"
  id="outlined-basic"
  variant="outlined"
  onChange={(e) => handleDetails("location", e.target.value)}
  value={details.location}
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