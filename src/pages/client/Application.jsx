/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Commentbox from "./Commentbox";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

const Application = ({application,jobid,jobaction}) => {
  
  const [ loader,setLoader ] = useState(false);
  const notification = useContext(NotificationContextManager);
  const [ comment,setComment ] = useState(false);

  const getPdf = async (link) => {
        try {
            /* const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob); */
            const a = document.createElement('a');
            a.href = link;
            a.target = '_blank'; // Specify the file name here
            document.body.appendChild(a);
            a.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const handleComment = () => {
      setComment(false);
    }

  const performAction = async() => {

    setLoader(true);

    const coll1 = collection(db,"Hireup_Db","Jobs","Job_Db",`${jobid}`,"UsersApplied_Db");
    const docref = doc(coll1,`${application.userid}`);

    let status = "";

    if(jobaction === "approver")
    {
      status = "APPROVED";
      setComment(false);
      updateDoc(docref,{
        "status":status,
      }).then(() => notification("Approved User Application","success"),() => notification("Approval Of User Application Failed","error"));
  
    }
    else if(jobaction === "reviewer")
    {
      status = "REVIEWED";
      setComment(false);
      updateDoc(docref,{
        "status":status,
      }).then(() => notification("Reviewed User Application","success"),() => notification("Reviewal Of User Application Failed","error"));
    }
    else
    {
      setComment(true);
    }

    
    setLoader(false);
  }




  return (
    <>
      <div className="application">
      <div className="img">
          <img src={ application.img ? application.img : "" } alt="" srcSet="" />
        </div>

        <div className="name">
          <h3>{application.name}</h3>
        </div>
        <div className="downloadicon">
        <DownloadIcon
            onClick={() => getPdf(application.resumelink)}
            className="eye-icon"
            fontSize="small"
          />
        </div>
        <div className="actions">
          <button
            onClick={(e) => performAction(e.target.value)}
            className="permissionactionbtn">
            
            {
              loader ? 
              
              <span class="actionloader"></span> : 
                
              jobaction === "approver" ? 
                "Approve" :
                jobaction === "reviewer" ? 
                  "Review" :
                  "Comment"
            }

          </button>
        </div>
      </div>

      {
        comment && <Commentbox jobid={jobid} applicationid={application.userid} setComment={handleComment}/>
      }
    </>
  );
};

export default Application;
