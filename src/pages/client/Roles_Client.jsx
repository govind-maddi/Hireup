import { useState,useEffect, useContext } from "react";
import Header from "../../ParentContComponents/Header";
import Application from "./Application"
import Commentbox from "./Commentbox";
import { doc,collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

import forbidden from '../../assets/infoillustrations/Forbidden.png';

import { json2csv } from 'json-2-csv';


function Roles_Client() {
  const [applications,setApplications] = useState([]);
  const [ loader,setLoader ] = useState(false);
  const [ access,setAccess ] = useState(false);
  const [ accessvalue,setAccessValue ] = useState("");
  const [ jobid,setJobId ] = useState("");
  const [ jobaction,setJobAction ] = useState("");

  const notification = useContext(NotificationContextManager);


  const exportCSV = () => {
    const csv = json2csv(applications);
    console.log(csv);
  }

  useEffect(() => {
    
    try
    {
      setLoader(true);
      
      const { auth } = JSON.parse(localStorage.getItem("hireup"));
      const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
      const docref = doc(coll,`${auth.id}`);
  
      onSnapshot(docref,(docu) => {
        
        if(docu.data().status === "APPROVED")
        {
           
          if(docu.data().jobroleassigned !== "" && docu.data().jobroleassigned.length === 10)
          {
            setJobId(docu.data().jobroleassigned);
            if(docu.data().permission !== "")
            {
              const coll1 = collection(db,"Hireup_Db","Jobs","Job_Db",`${docu.data().jobroleassigned}`,"UsersApplied_Db");
              onSnapshot(coll1,(docu1) => {
                let temp = docu1.docs.map((item) => item.data());
                
                //console.log(docu.data().status);
                setApplications(temp);
                setAccess(false);
                setJobAction(docu.data().permission);
              })
            }
            else
            {
              setAccess(true);
              setApplications([]);
              setAccessValue("Permission");
              setJobAction("");
            }

          }
          else
          {
            console.log("no job role");
            setAccess(true);
            setAccessValue("Jobrole");
            setJobId("");
            setApplications([]);
          }
         
        }
        else
        {
          setAccess(true);
          setAccessValue(docu.data().status);
        }
      })
    }
    catch(err)
    {
      console.log(err);
    }
    finally{
      setTimeout(() => setLoader(false),1000);
    }

  }, [])

  return (
    <>
      <Header
        btn1="My Dashboard(C)"
        btn2="My Profile(C)"
        typeOfBtn="Logout"
        array={[
          "My Dashboard(C)",
          "My Profile(C)",
          "Pending Applications",
          "Logout",
        ]}
      />
        <button className="btn" onClick={exportCSV} style={{display:"none",position:'relative',top:'40px',left:'100px'}}>Export Csv</button>
        <div className="client-roles">

        {
          loader ? 

          <div id="loadercont">
          <span className="loader"></span>
          <label>Loading Applications</label>
          </div> :

          access ? 

          <figure className="forbiddenimg">
            <img src={forbidden} alt="" srcSet="" width="450px" height="450px"/><br/>
            { accessvalue === "" && <label>Your Access Is <span style={{color:"#00BFB3",fontWeight:'600'}}>Forbidden</span></label>} 
            { accessvalue === "DEACTIVATED" && <label>Your Access Is <span style={{color:"#00BFB3",fontWeight:'600'}}>Blocked</span></label>} 
            { accessvalue === "Permission" && <label>Your Have Not Been Assigned Any <span style={{color:"#00BFB3",fontWeight:'600'}}>Permission</span></label>}
            { accessvalue === "Jobrole" && <label>Your Have Not Been Assigned Any <span style={{color:"#00BFB3",fontWeight:'600'}}>Job Role</span></label>}
          </figure> :

          applications && applications.map((application, index) => (
            <Application key={index} application={application} jobid={jobid} jobaction={jobaction}/>
          ))

        }
      </div>
      
      {/* <Commentbox/> */}
      {/* <div className="application-footer">
        <div className="left">
          <h2>Job Role :</h2>
          <select>
            <option value="all">All</option>
            <option value="sde">SDE</option>
            <option value="frontend">FrontEnd</option>
            <option value="backend">Backend</option>
            <option value="analyst">Analyst</option>
          </select>
        </div>
        <div className="btns">
          <div className="btn">Approve</div>
          <div className="btn">Reviewed</div>
          <div className="btn">Comment</div>
        </div>
      </div> */}
    </>
  );
}

export default Roles_Client