import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Header from "../../ParentContComponents/Header";
import { useContext, useEffect, useState } from "react";

import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

const Expandedjob = () => {

  const [ jobdetails,setJobDetails ] = useState({});
  const notification = useContext(NotificationContextManager);

  const onApply = async () => {

    const {auth} = JSON.parse(localStorage.getItem("hireup"));
    const job = {...jobdetails};

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
            "img":docu1.data().img,
            "name":docu1.data().name,
            "comments":[],
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

  useEffect(() => {
    let temp = localStorage.getItem('jobobj');
    temp = JSON.parse(temp);
    setJobDetails(temp);
  },[])


  return (
    <>
      <Header btn1="Find Jobs" btn2="My Dashboard" typeOfBtn="Logout"/>
      <div className="job-card-expanded">
        <div className="top">
          <div className="left">
            <div className="img"></div>
            <div className="desc">
              <h3>{jobdetails.jobTitle}</h3>
              <p>{jobdetails.location}</p>
            </div>
          </div>
          <div className="right">
            <button onClick={()=>onApply()} className="btn">Apply</button>
          </div>
        </div>
        <div className="bottom">
          <div className="vacancy d-flex">
            <div>
              <AccountCircleIcon />
            </div>
            <div>{jobdetails.vacancy}</div>
          </div>
          <div className="package d-flex">
            <div>
              <AccountBalanceWalletIcon />
            </div>
            <div>{jobdetails.CTC}</div>
          </div>
        </div>
        <div className="job-desc">
          <h3>Job Description:</h3>
          <br />
          <p>
            {jobdetails.jobDescription}
          </p>
          <br />
          {/* <h3>Address : </h3>
          <br />
          <p>
            {jobdetails.address}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Expandedjob;
