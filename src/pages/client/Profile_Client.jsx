/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import "./clientStyle.css";
import Header from "../../ParentContComponents/Header";
import { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function Profile_Client() {

  const [ details,setDetails ] = useState({
    "username":"",
    "emailid":"",
    "password":"",
    "jobrole":"",
    "img":"",
  });

  const [ loader,setLoader ] = useState(false);
  const notification = useContext(NotificationContextManager);

  const handleDetails = (key,value) => {
    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [key]:value,
      }
    });
  }


  useEffect(() => {

    const fetchUserDetails = async() => {

      const { auth } = JSON.parse(localStorage.getItem("hireup"));

      const coll =  collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
      const docref = doc(coll,`${auth.id}`);
      
       onSnapshot(docref,(docu) => {
        const data = docu.data();
        //console.log(data);
        setDetails({
          username:data.name,
          emailid:data.emailid,
          password:data.password,
          jobrole:data.jobpost,
          img:data.img,
        })
      })
    }

    fetchUserDetails();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("file", file);

    const {auth} = JSON.parse(localStorage.getItem("hireup"));

    const id = "profilepic"
    const fileref = ref(storage, `Users/${auth.id}/resumes/${id}`);
    
    uploadBytes(fileref, file).then((snapshot) => {
      getDownloadURL(fileref).then(async (url) => {
        const coll =  collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
        const docref = doc(coll,`${auth.id}`);

        await updateDoc(docref,{
          "img":url,
        });

        notification("Updated Profile Pic","success");

      },() => notification("Failed To Upload Image","error"));
    },() => notification("Failed To Upload Image","error"));
    
  };

  const updateDetails = async () => {
    setLoader(true);
    try
    {
      const {auth} = JSON.parse(localStorage.getItem("hireup"));
        const coll =  collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
        const docref = doc(coll,`${auth.id}`);
        const docu = await getDoc(docref);

        if(docu.exists)
        {
          await updateDoc(docref,{
            "name":details.username,
            "jobpost":details.jobrole,
          });
          notification("Successfully Updated Details","success");
        }
        else
        notification("Updating Details Failed Try Again","error");
        
    }
    catch(err)
    {
        console.log(err);
        notification("Updating Details Failed Try Again","error");
    }
    finally{
      setLoader(false);
    }

  };

  return (
    <>
      <Header
        btn1="My Dashboard(C)"
        btn2="Pending Applications"
        typeOfBtn="Logout"
        array={[
          "My Dashboard(C)",
          "My Profile(C)",
          "Pending Applications",
          "Logout",
        ]}
      />
      <div className="profile-page">
        <div className="user-details">
          <div className="top">
            <div className="image">
              <div className="left">
                <img src={ details.img ? details.img : "" } alt="" />
              </div>
              <form id="uploadForm" encType="multipart/form-data" style={{marginTop:"30px"}}>
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
                <h2>Welcome User..!</h2>
                <br/>
                <TextField
                  label="User Name..."
                  type="text"
                  value={details.username}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => handleDetails("username",e.target.value)}
                  ></TextField>
              </div>
            </div>
          </div>
          <div className="bottom" style={{marginTop:"50px"}}>
            <TextField
              label="emailid"
              value={details.emailid}
              id="outlined-basic"
              variant="outlined"
              type="email"
              InputProps={{readOnly:true}}
            />
            <TextField
              label="password"
              value={details.password}
              id="outlined-basic"
              variant="outlined"
              type="text"
              InputProps={{readOnly:true}}
            />
            <TextField
              label="Job Role"
              value={details.jobrole}
              id="outlined-basic"
              variant="outlined"
              type="text"
              onChange={(e) => handleDetails("jobrole",e.target.value)}
            />
            <button onClick={() => updateDetails()} className="btn">
            {
              loader ? 
              <> <span className="loadersmall" style={{position:'relative',top:'-1px',marginRight:'10px'}}></span> <span>Updating. . .</span> </> :
              "Update"
            }
            </button>
          </div>
        </div>
      </div>
      <div className="delete-account d-flex">
        <h3>Delete My Profile</h3>
        <button className="btn">Delete</button>
      </div>
    </>
  );
}

export default Profile_Client;
