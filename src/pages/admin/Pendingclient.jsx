/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./adminStyle.css"
import { NotificationContextManager } from "../../context/NotificationContext";
import { collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";


const Pendingclient = ({ role1, role2, client }) => {

  const notification = useContext(NotificationContextManager);
  
  const approveOrDisapprove = async (action,client) => {

    const {auth} = JSON.parse(localStorage.getItem("hireup"));
    const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
    
    const docref = doc(coll,`${client.emailid}`);
    const docu = await getDoc(docref);

    if (action === "Approve") {
      try
      {
        if(docu.exists())
        {
          await updateDoc(docref,{
            "status":"APPROVED",
          });

          notification("Client Approval Successfully","success");
        }
      }
      catch(err)
      {
        notification("Client Approval Failed","error");
        console.log(err);
      }
    } 
    else if(action === "Reject") 
    {

      try
      {   
        if(docu.exists())
        {
          await deleteDoc(docref);
          notification("Client Approval Rejected and Deleted","success");
        }
      }
      catch(err)
      {
        notification("Client Rejection Failed","error");
        console.log(err);
      }

    }
  }

  const manageItem = async (action,client) => {

    const {auth} = JSON.parse(localStorage.getItem("hireup"));
    const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
    
    const docref = doc(coll,`${client.emailid}`);
    const docu = await getDoc(docref);

    if (action === "Deactivate") {

      try
      {
        if(docu.exists())
        {
          await updateDoc(docref,{
            "status":"DEACTIVATED",
          });
          notification("Client Portal Deactivated","success");

        }
      }
      catch(err)
      {
        notification("Client Portal Deactivation Failed","error");
        console.log(err);
      }
    } 
    
    else if (action === "Activate") {

      try
      {    
        if(docu.exists())
        {
          await updateDoc(docref,{
            "status":"APPROVED",
          });
          notification("Client Portal Activated","success");
        }
      }
      catch(err)
      {
        notification("Client Portal Activation Failed","error");
        console.log(err);
      }

    }
    // Delete btn handle
    else 
    {
      try
      {  
        if(docu.exists())
        {
          await deleteDoc(docref);
          notification("Client Deletion Succcessfull","success");
        }
      }
      catch(err)
      {
        notification("Client Deletion Failed","error");
        console.log(err);
      }
    }
  };

  function handleClick(role) {
    if (role === "Approve") {
      console.log(client);
      approveOrDisapprove("Approve",client)
    }
    else if (role === "Reject") {
      approveOrDisapprove("Reject",client);
    }
    else if(role === "Activate")
      manageItem("Activate",client);
    else if (role === "Deactivate") {
      manageItem("Deactivate",client)
    }
    else if (role === "Delete") {
      manageItem("Delete",client);
    }
  }

  return (
    <div className="pendinglist_item" style={{opacity: client.status === "DEACTIVATED" ? "0.8" :"1" }}>
      <div className="img">
        <img src={client.img} alt="" />
      </div>
      <div className="name">
        <h3>{`${client.name}`}</h3>
      </div>
      <div className="percentage">
        <h4>{client.jobpost}</h4>
      </div>
      <div className="recruit-approve">
        <button style={{display : client.status === "DEACTIVATED" ? "none" : "block" }} onClick={() => handleClick(role1)} className="requestbtn">
          {role1}
        </button>
        <button style={{display : client.status === "DEACTIVATED" ? "block" : "none"}} onClick={() => handleClick("Activate")} className="requestbtn">
          Activate
        </button>
        <button onClick={() => handleClick(role2)} className="requestbtn">
          {role2}
        </button>
      </div>
    </div>
  );
}

export default Pendingclient