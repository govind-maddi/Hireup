/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import Resume from "./myresumecomp/Resume";

import resumeupload from '../../assets/resumeupload.png';
import resumeuploading from '../../assets/resumeuploading.png';

import { db,storage } from '../../firebase/config';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref,uploadBytes } from "firebase/storage";

import { NotificationContextManager } from "../../context/NotificationContext";

function MyResumes() {

  const [resumelist,setResumeList] = useState([]);
  const notification = useContext(NotificationContextManager);
  const [ uploader,setUploader ] = useState(false);

  const uploadbtn = useRef(null);

  // //async useeffect call at mount
  useEffect(() => {
    
    const fetchReusmes = async () => {
      const coll = collection(db,"Hireup_Db","EndUsers","User_Db");
      const {auth} = JSON.parse(localStorage.getItem("hireup"));
      const docref = doc(coll,`${auth.id}`);
      
      const unsubscribe = onSnapshot(docref,(docu) => {
        if(docu.exists())
        {
          let temp = [];
          if(docu.data().resumes)
          {
            temp = docu.data().resumes.map((item) => {
              if(item.currentversion)
                return {"link":item.currentversion,"selected":item.selected};
            });
            setResumeList(temp);
          }
          else
          {
            notification("No Resumes Uploaded Upload One","error");
          } 
        }
      })
    }

    fetchReusmes();
    
  }, []);

  const generateResumeId = () => {
    let resumeid = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 8; i++) {
            resumeid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      return resumeid;
  }

  const handleUpload = async (e) => {
    try{
      setUploader(true);
      const file = e.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase()

    if(extension === 'pdf')
    {
      const {auth} = JSON.parse(localStorage.getItem("hireup"));

      const resumeid = generateResumeId();
  
      const fileref = ref(storage, `Users/${auth.id}/resumes/${resumeid}`);
  
      uploadBytes(fileref, file).then((snapshot) => {
        getDownloadURL(fileref).then(async (url) => {
          const coll = collection(db,"Hireup_Db","EndUsers","User_Db");
          const {auth} = JSON.parse(localStorage.getItem("hireup"));
          const docref = doc(coll,`${auth.id}`);
          const docu = await getDoc(docref);
  
          let temp = docu.data().resumes.map((item) => item);
          
          await updateDoc(docref,{
            "resumes":[...temp,{"currentversion":url,"versions":[{"1":url,"id":resumeid}]}],
          });
          e.target.value = null;
          setUploader(false);
        },() => {
          setUploader(false)
          notification("Failed To Upload Resume","error")
          })
      },() => {
        setUploader(false)
        notification("Failed To Upload Resume","error")
        });
    }
    else
      notification("Only Pdf files can be uploaded","error");
    }
    catch(err)
    {
      console.log(err);
    }
  };


  return (
    <div className="my-resumes">
      <div className="head d-flex">
        <header className="section_header">My <span className="section_header_ul" >Resumes</span></header>
        {/* Resme Upload btn */}
        <div>
          <div>
          </div>
        </div>
      </div>
      <div className="all-resumes">

      <div className="resume">
      <div>
        <input ref={uploader ? null : uploadbtn} onChange={handleUpload} style={{display:"none"}} type="file" /> 

        <img src={uploader ? resumeuploading : resumeupload} className="resumeimg" onClick={() => uploadbtn.current.click()}/>
      </div>
      </div>

        {resumelist.map((resume, index) => {
          return <Resume key={index} resume={resume} />;
        })}
      </div>
      {/* upload resume btn */}
    </div>
  );
}

export default MyResumes;
