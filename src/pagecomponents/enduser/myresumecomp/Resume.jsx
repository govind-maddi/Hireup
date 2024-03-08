/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { useContext,useEffect,useState } from 'react'

import resumepic from '../../../assets/resume.png'; 

import { db,storage } from '../../../firebase/config';
import {ref,deleteObject} from 'firebase/storage'
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

import { NotificationContextManager } from '../../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

function Resume({ resume }) {
  const [message,setMessage] = useState()
  const handleNotification = useContext(NotificationContextManager);

  const [ deleteflag,setDeleteFlag ] = useState(false);

  const notification = useContext(NotificationContextManager);
  const navigate = useNavigate();

  // 
 const downloadResume = async () => {
   const pdfUrl = resume.link; // Replace '1' with the correct ID
   try {
     const a = document.createElement("a");
     a.href = resume.link;
     a.target = "_blank"; // Specify the file name here
     document.body.appendChild(a);
     a.click();
   } catch (error) {
     console.error("Error downloading PDF:", error);
     setMessage("Failed to download PDF");
   }
 };

 const handleSelected = async() => {
      const coll = collection(db,"Hireup_Db","EndUsers","User_Db");
      const {auth} = JSON.parse(localStorage.getItem("hireup"));
      const docref = doc(coll,`${auth.id}`);
      const docu = await getDoc(docref);
      if(docu.exists())
      {
        let temp = [...docu.data().resumes];
        let index = temp.findIndex((item) => item.currentversion === resume.link);
        
        if(index !== -1)
        {
          let obj = {...temp[index]};
          temp = temp.map((item) => {return {...item,"selected":false}});
          temp[index] = {...obj,"selected":true};
        }

        await updateDoc(docref,{"resumes":temp});
        notification("Selected Resume","success");
      }

 }

 const handleDelete = async() => {
      try
      {
        console.log("started delete");
        const coll = collection(db,"Hireup_Db","EndUsers","User_Db");
      const {auth} = JSON.parse(localStorage.getItem("hireup"));
      const docref = doc(coll,`${auth.id}`);
      const docu = await getDoc(docref);
      if(docu.exists())
      {
        console.log("started delete 1");
        let temp = docu.data().resumes.map((item) => item);

        const index = temp.findIndex((item) => item.currentversion === resume.link);

        
        if(index !== -1)
        {
          console.log(temp[index].versions);
          let temp1 = temp[index].versions.map((item) => item);

          temp1.forEach((item) => {
            const fileref = ref(storage,`Users/${auth.id}/resumes/${item.id}`);
            deleteObject(fileref);
          })

          let data = [...docu.data().resumes];
          data = data.filter((item) => item.currentversion !== resume.link);

          await updateDoc(docref,{"resumes":data});
          setDeleteFlag(true);
          notification("Deleted Resume","success");
        }
      }
      }
      catch(err)
      {
        console.log(err);
        notification("Failed To Delete","error");
      }
      setDeleteFlag(false);
    }

  return (
    <div className="resume">
      <div className={ deleteflag && "resume_inner" }>
        
        <img src={resumepic} alt="" className='resumeimg' style={{border : resume.selected ? "4px #0eb90e solid" : "1px black solid"}} onClick={() => downloadResume()}/><br/>
        
        <label>Resume 1</label><br/>
        
        <svg style={{marginRight:'20px'}} onClick={handleSelected}
          fill="green" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
          <path d="M128,24A104,104,0,1,0,232,128,104.12041,104.12041,0,0,0,128,24Zm49.53125,85.78906-58.67187,56a8.02441,8.02441,0,0,1-11.0625,0l-29.32813-28a8.00675,8.00675,0,0,1,11.0625-11.57812l23.79687,22.72656,53.14063-50.72656a8.00675,8.00675,0,0,1,11.0625,11.57812Z"/>
        </svg>

        <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill='#ed2727'>
          <path d="m17,4v-2c0-1.103-.897-2-2-2h-6c-1.103,0-2,.897-2,2v2H1v2h1.644l1.703,15.331c.169,1.521,1.451,2.669,2.982,2.669h9.304c1.531,0,2.813-1.147,2.981-2.669l1.703-15.331h1.682v-2h-6Zm-8-2h6v2h-6v-2Zm6.957,14.543l-1.414,1.414-2.543-2.543-2.543,2.543-1.414-1.414,2.543-2.543-2.543-2.543,1.414-1.414,2.543,2.543,2.543-2.543,1.414,1.414-2.543,2.543,2.543,2.543Z"/>
        </svg>

      </div>
    </div>
  );
}

export default Resume