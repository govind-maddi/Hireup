/* eslint-disable no-unused-vars */
import { useState,useEffect } from "react";
import Header from "../../ParentContComponents/Header";
import Pendingclient from "./Pendingclient";
import BasicError from "../../pagecomponents/enduser/errorcomp/BasicError";
import { collection, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function Clients() {
  const [type, setType] = useState("approve");
  const clientReq = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  const [tobeapprovedlist, setToBeApprovedList] = useState([]);
  const [alreadyapprovedlist, setAlreadyApprovedList] = useState([]);

  const [loader,setLoader] = useState(true);

  const [ fetchStatus, setFetchStatus] = useState(false);

  const fetchClients_Approve = async () => {
    try
    {
        setFetchStatus(false);

        const {auth} = JSON.parse(localStorage.getItem("hireup"));
        const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
        
        const unsubscribe = onSnapshot(coll,(docushot) => {
        
          let temp = [];

          temp = docushot.docs.map((docu) => docu.data());

          temp = temp.filter((item) => !item.status || item.status === "");

          if(temp.length > 0)
            setToBeApprovedList(temp);
          else
            setToBeApprovedList([]);

        });
    }
    catch(err)
    {
      console.log(err);
      setFetchStatus(true);
    }
    finally{
        setTimeout(() => setLoader(false),2000);
     }
  };

  const fetchClients_Manage = async () => {

    try
    {
      setFetchStatus(false);
      
      const {auth} = JSON.parse(localStorage.getItem("hireup"));
      const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
        
      const unsubscribe = onSnapshot(coll,(docushot) => {
        
        let temp = [];

        temp = docushot.docs.map((docu) => docu.data());

        temp = temp.filter((item) => item.status === "APPROVED" || item.status === "DEACTIVATED");

        setAlreadyApprovedList(temp);

      });
    }

    catch(err)
    {
      setFetchStatus(true);
      console.log(err)
    }

    finally{
      setTimeout(() => setLoader(false),2000);
    }
  }


  useEffect(() => console.log(tobeapprovedlist),[tobeapprovedlist]);

  useEffect(() => {

    if(type === "approve")
    {
      fetchClients_Approve();
    }

    else
    {
      fetchClients_Manage();
    }
  }, [type]);



  return (
    <>
      <Header
        btn1="My DashBoard"
        btn2="My_Profile"
        typeOfBtn="Logout"
        array={["Manage Requests", "My_Profile", "My DashBoard", "Logout"]}
      />
        <div className="request_controller">
        <button
          onClick={() => {setLoader(true);setType("approve")}}
          className={type === "approve" ? "tabbtn active" : "tabbtn"}>
          Approve
        </button>
        <span> </span>
        <button
          onClick={() => {setLoader(true);setType("manage")}}
          className={type === "manage" ? "tabbtn active" : "tabbtn"}>
          Manage
        </button>
        </div>

        <div className="roles-admin">

          {
            loader ? 

            <div id="loadercont">
            <span className="loader"></span>
            <label>Loading Recruiters</label>
            </div> :

            fetchStatus ? 

              <BasicError/> :

                  <>
                  {
                  type === "approve"
                  ? tobeapprovedlist.map((client, index) => (
                      <Pendingclient key={index} client={client} role1="Approve" role2="Reject" />
                    ))
                  : alreadyapprovedlist.map((client, index) => (
                      <Pendingclient key={index} client={client} role1="Deactivate" role2="Delete" />
                    ))
                  }
                  </>

          }
        </div>
    </>
  );
}

export default Clients;
