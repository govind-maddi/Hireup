import { useState,useEffect, useContext } from "react";
import Header from "../../ParentContComponents/Header";
import Application from "./Application"
import Commentbox from "./Commentbox";
import { doc,collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

function Roles_Client() {
  const [applications,setApplications] = useState([]);

  const [ loader,setLoader ] = useState(false);
  const notification = useContext(NotificationContextManager);

  useEffect(() => {

    const {auth} = JSON.parse(localStorage.getItem("hireup"));
    const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
    const docref = doc(coll,`${auth.id}`);

    onSnapshot(docref,(docu) => {
      
      if(docu.data().status === "APPROVED")
      {
        
        const coll1 = collection(db,"Hireup_Db","Jobs","Job_Db",`${docu.data().jobroleassigned}`,"UsersApplied_Db");
        onSnapshot(coll1,(docu1) => {
          let temp = docu1.docs.map((item) => item.data());

          //console.log(temp);
          setApplications(temp);
        })
        
       
      }
      else
        notification("Get Approval from Admin","error");
    })

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
        <div className="client-roles">

        {
          loader ? 

          <div id="loadercont">
          <span class="loader"></span>
          <label>Loading Applications</label>
          </div> :

          applications && applications.map((application, index) => (
            <Application key={index} application={application}/>
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