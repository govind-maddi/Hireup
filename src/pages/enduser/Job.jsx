import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import "./enduserStyle.css";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

function Job({job}) {
  const navigate = useNavigate();

  const notification = useContext(NotificationContextManager);

  const onApply = async () => {

    const {auth} = JSON.parse(localStorage.getItem("hireup"));

    const coll = collection(db,"Hireup_Db","Jobs","Job_Db",`${job.id}`,"UsersApplied_Db");
    const docref = doc(coll,`${auth.id}`);
    const docu = await getDoc(docref);

    const coll1 = collection(db,"Hireup_Db","EndUsers","User_Db");
    const docref1 = doc(coll1,`${auth.id}`);
    const docu1 = await getDoc(docref1);

    let temp1 =  docu1.data().jobsappliedto.map((item) => item);
    const resumeflag = temp1.length > 0 ? temp1.find((item) => item.jobid !== job.id) : true;
   
    if(!docu.exists() && resumeflag)
    {
      let temp = [...docu1.data().resumes];
      
      if(temp.length > 0)
      {
        temp = temp.filter((item) => item.selected && item.selected === true);

        if(temp.length > 0)
        {
          await setDoc(docref,{
            "userid":auth.id,
            "jobTitle":job.jobTitle,
            "jobctc":job.CTC,
            "status":"PENDING",
            "resumelink":temp[0].currentversion,
          })
        
          await updateDoc(docref1,{
                "jobsappliedto":[...temp1,{
                
                "jobid":job.id,
                "jobTitle":job.jobTitle,
                "jobctc":job.CTC,
                "status":"PENDING",}]
                
          })
            notification("Applied To Job","success");
        }
        else
          notification("Resume to Send Not Selected","error");
        }
        else 
          notification("Upload Resume To Apply","error");

    }
    else
      notification("Already Applied To Job","error");

  };

  function handleJobDescClick() {
    console.log("he")
    localStorage.setItem("jobobj",JSON.stringify(job));
    navigate("/user/jobs/job");
  }

  return (
    <div className="job-card">
      <div className="top">
        <div className="left">
          <div className="img"></div>
          <div className="desc">
            <h3 onClick={() => handleJobDescClick()} style={{cursor:"pointer"}}>{job.jobTitle}</h3>
            <p>{job.location}</p>
          </div>
        </div>
        <div className="right">
          
          <button onClick={()=>onApply()} className="btn">Apply</button>
        </div>
      </div>
      <div className="bottom">
        <div className="position d-flex">
          <div style={{marginRight:"5px"}}>
            <BusinessCenterIcon />
          </div>
          <div>{job.jobTitle}</div>
        </div>
        <div className="vacancy d-flex">
          <div style={{marginRight:"5px"}}>
            <AccountCircleIcon />
          </div>
          <div>{job.vacancy}</div>
        </div>
        <div className="package d-flex">
          <div style={{marginRight:"5px"}}>
            <AccountBalanceWalletIcon />
          </div>
          <div>{job.CTC}</div>
        </div>
      </div>
    </div>
  );
}

export default Job;
