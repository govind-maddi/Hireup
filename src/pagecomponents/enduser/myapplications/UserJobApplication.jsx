/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

function UserJobApplication({ application, deleteUserJobApplication,serialnumber }) {
  const [jobstatus, setJobStatus] = useState("");
  const [commentflag,setCommentFlag] = useState(false);
  const [ commenttext,setCommentText ] = useState("");

  //async call in useEffect to get application job status

  const openComment = () => {
    setCommentFlag(true);
  }

  const closeComment = () => {
    setCommentFlag(false);
  }

  useEffect(() => {
    
    const {auth} = JSON.parse(localStorage.getItem("hireup"));

    const coll = collection(db,"Hireup_Db","Jobs","Job_Db",`${application.jobid}`,"UsersApplied_Db");
    const docref = doc(coll,`${auth.id}`);
    let status;

    onSnapshot(docref,(docu) => {
      status = docu.data().status;
      setJobStatus(status);

      if(status === "REJECTED")
      {
        setCommentFlag(false);
        let text = "";
        docu.data().comments.forEach((item) => {
          text+=item+"\n\n\n";
        });
        setCommentText(text); 
      }
      else if(status === "")
      {
        setJobStatus("PENDING");
      }

    })

  }, []);

  return (
    <div className="assignlist_item" style={{fontWeight:"500"}}>
      <div className="s-no">{serialnumber+1}</div>
      <div className="company-name">{application.jobTitle}</div>
      <div className="package">{application.jobctc}</div>
      
      { jobstatus === "PENDING" && <div className="job-status"><label style={{backgroundColor:"#D75137"}} >{jobstatus}</label></div> }
      { jobstatus === "APPROVED" && <div className="job-status"><label style={{backgroundColor:"#3A7AC6"}} >{jobstatus}</label></div> }
      { jobstatus === "REVIEWED" && <div className="job-status"><label style={{backgroundColor:"#13BB7D"}} >{jobstatus}</label></div> }
      { jobstatus === "REJECTED" && <div className="job-status"><label style={{backgroundColor:"#D75137"}} >{jobstatus}</label></div> }


      <div className="job-actions">

      <svg onClick={openComment} xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" fill="#584ebf" style={{visibility:jobstatus === "REJECTED" ? "visible" : "hidden" }}><path d="M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.9l4.451,3.763a1,1,0,0,0,1.292,0L17.1,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0ZM7,5h5a1,1,0,0,1,0,2H7A1,1,0,0,1,7,5ZM17,15H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7A1,1,0,0,1,7,9H17a1,1,0,0,1,0,2Z"/></svg>

      <svg onClick={() => handleDelete(resume.currentversion)} fill='red' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" fill="none" width="24" height="24"/>
          <g>
          <path d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0 4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8-1.4 1.4z"/>
          </g>
        </svg>

      </div>

      {
          commentflag && 
          
          <section className="comment_box">
              <header>Feedback</header>
              
              <svg onClick={closeComment} fill="red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" xml:space="preserve">
                <g>
	              <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
                </g>
              </svg>

              <section>
                <label>Comments</label>
                <textarea value={commenttext} readOnly={true}></textarea>
              </section>
          </section>

        }

    </div>
  );
}

export default UserJobApplication;
