/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { NotificationContextManager } from "../../context/NotificationContext";
import { db } from "../../firebase/config";

const Assignrole = ({ person }) => {

  const [selectroles,setSelectRoles] = useState([]);
  
  const [ assignnedpermisssion,setAssignedPermission ] = useState('');
  const [ assignedjobrole,setAssignedJobRole ] = useState('');

  const notification = useContext(NotificationContextManager);
  
  const fetchCreatedRoles = async() => {

    try
    {   
        const {auth} = JSON.parse(localStorage.getItem("hireup"));

        const jobrolescreatedref = doc(db,"Hireup_Db","Organizations",`${auth.orgid}`,"JobRolesCreated");
        const jobrolescreateddoc = await getDoc(jobrolescreatedref);

        if(jobrolescreateddoc.exists())
        {
          setSelectRoles(jobrolescreateddoc.data().rolescreated);
        }
        else
          throw new Error("No Job Roles Created","error");
    }
    catch(err)
    {
      console.log(err)
      notification(err.message,"error");
    }

  }

  useEffect(() => {

    const sendPermission = async () => {

      try
      {
        const {auth} = JSON.parse(localStorage.getItem("hireup"));

        const recruitersdbcoll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
        const recruitersdbref =  doc(recruitersdbcoll,`${person.emailid}`);
        const recruiterdb = await getDoc(recruitersdbref);

        if(recruiterdb.exists())
        {
          const data = recruiterdb.data();

          await updateDoc(recruitersdbref,{
            ...data,
            "permission":assignnedpermisssion,
          });

          notification("Assigned Permission","success");
        }
      }
      catch(err)
      {
        console.log(err);
        notification("Assigning Permission Failed","error");
      }
    }

    if(assignnedpermisssion !== "")
      sendPermission();

  }, [ assignnedpermisssion ]);

  useEffect(() => {

    const sendJobRole = async() => {
      try
      {
        const {auth} = JSON.parse(localStorage.getItem("hireup"));

        const recruitersdbcoll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
        const recruitersdbref =  doc(recruitersdbcoll,`${person.emailid}`);
        const recruiterdb = await getDoc(recruitersdbref);

        if(recruiterdb.exists())
        {
          const data = recruiterdb.data();

          await updateDoc(recruitersdbref,{
            ...data,
            "jobroleassigned":assignedjobrole,
            
          });

          notification("Assigned Job Role","success");
        }
      }
      catch(err)
      {
        console.log(err);
        notification("Assigning Job Role Failed","error");
      }
    }

    if(assignedjobrole !== "")
      sendJobRole();

  }, [assignedjobrole])

  
  useEffect(() => {
    fetchCreatedRoles();
  }, []);


  return (
    <div className="assignlist_item">
      <div className="img">
        <img src={person.img} alt="" />
      </div>
      <div className="name">
        <h3>{`${ person.name }`}</h3>
      </div>
      <div className="percentage">
        <h4>{person.jobpost}</h4>
      </div>
      <div className="recruit-jobrole">
        <select value={person.jobroleassigned}  onChange={(e)=>setAssignedJobRole(e.target.value)} className="dropdown" >
          <option value="" selected disabled hidden>Select role</option>
          {
            selectroles.map((jobrole,index) => {
              return <option key={index} value={jobrole.jobid}>{jobrole.jobname}</option>
            })
          }
        </select>
      </div>
      <div className="recruit-approve">
        <select value={person.permission}  onChange={(e)=>setAssignedPermission(e.target.value)} className="dropdown" >
          <option value="" selected disabled hidden>Select Permission</option>
          <option value="approver">Approver</option>
          <option value="reviewer">Reviewer</option>
          <option value="commenter">Commenter</option>
        </select>
      </div>
    </div>
  );
}

export default Assignrole