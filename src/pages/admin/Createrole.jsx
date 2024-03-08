/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

const Rolecard = ({ role }) => {

  const [ selectRoles, setSelectRoles ] = useState([]);

  const [ selectedjobrole, setSelectedJobRole ] = useState('');
  
  const [ createroles,setCreateRoles ] = useState({
    jobTitle: "",
    vacancy: 0,
    jobDescription: "",
    CTC: 0,
    location: "",
  });

  const [ loader,setLoader ] = useState(false);

  const notification = useContext(NotificationContextManager);

  const handleCreateRoles = (key,value) => {
    setCreateRoles((prevRoles) => {

      return{
        ...prevRoles,
        [ key ] : value,
      }
    })
  }

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
    

  const fetchSelectedJobRoleData = async() => {

    if(selectedjobrole !== "")
    {
        try
        {
          const jobdbcoll = collection(db,"Hireup_Db","Jobs","Job_Db",);
          //console.log(selectedjobrole);
          const jobdbref = doc(jobdbcoll,`${selectedjobrole}`);
          const jobdbdoc = await getDoc(jobdbref);

          if(jobdbdoc.exists())
          {
            //console.log(jobdbdoc.data());
            setCreateRoles(jobdbdoc.data());
          }
          else
            throw new Error("Job Role Not Present");
        }
        catch(err)
        {
          console.log(err);
          notification(err.msg,"error");
        }
    }
  }

  const jobIdCreator = () => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let uniqueId = '';
    
    for (let i = 0; i < 10; i++) {
        uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return uniqueId;

  }

  function handleUpdateOrCreateRole(role) {
    if (role === "Create") {
      // Function to create role
      const onCreateRole = async () => {

        try
        {
            const jobid = jobIdCreator();
        
            const jobscoll = collection(db,"Hireup_Db","Jobs","Job_Db");
            const jobdocref = doc(jobscoll,`${jobid}`);
            const jobdoc = await getDoc(jobdocref);

            if(!jobdoc.exists())
            {
              await setDoc(jobdocref,{...createroles,"id":jobid});
            
              const { auth } = JSON.parse(localStorage.getItem("hireup"));
              //console.log(auth);
            
              const orgcoll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`);
              const jobrolescreatedref = doc(orgcoll,"JobRolesCreated");
              const jobrolescreateddoc = await getDoc(jobrolescreatedref);   

              if(!jobrolescreateddoc.exists())
              {
                await setDoc(jobrolescreatedref,{
                  "rolescreated":[{"jobid":jobid,"jobname":createroles.jobTitle}],
                })
                notification("Job Role Creation Successfully","success");
              }
              else
              {
                let arr = [...jobrolescreateddoc.data().rolescreated];
                await updateDoc(jobrolescreatedref,{
                  "rolescreated":[...arr,{"jobid":jobid,"jobname":createroles.jobTitle}]
                })
                notification("Job Role Creation Successfully","success");
              }
           }
        }
        catch(err)
        {
          console.log(err)
          notification("Job Role Creation Failed","error")
        }

      }
      onCreateRole();
    } 
    else if (role === "Update") 
    {
      const updateRoleObj = async () => {

        try
        {
            const jobscoll = collection(db,"Hireup_Db","Jobs","Job_Db");
            const jobdocref = doc(jobscoll,`${selectedjobrole}`);
            const jobdoc = await getDoc(jobdocref);

            if(jobdoc.exists())
            {
              await updateDoc(jobdocref,createroles);
            
              const { auth } = JSON.parse(localStorage.getItem("hireup"));
              console.log(auth);
            
              const orgcoll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`);
              const jobrolescreatedref = doc(orgcoll,"JobRolesCreated");
              const jobrolescreateddoc = await getDoc(jobrolescreatedref)   

              if(jobrolescreateddoc.exists())
              {
                let arr = [...jobrolescreateddoc.data().rolescreated];

                const index = arr.findIndex((jobrole) => jobrole.jobid === selectedjobrole);

                if(index !== -1)
                  arr[index] = {"jobid":selectedjobrole,"jobname":createroles.jobTitle};
                else
                  throw new Error("Job Role Not Present");

                  await updateDoc(jobrolescreatedref,{
                    "rolescreated":[...arr],
                  })

                notification("Job Role Updated Successfully","success");
              }
            
           }
           else
              throw new Error("Job Role Not Present");

        }
        catch(err)
        {
          console.log(err);
          notification("job Role Updation Failed","error");
        }

      }

      if(selectedjobrole !== "")
        updateRoleObj();
      else
        notification("Select Job Role","error");
    }
  }


  function handledeleteRole(){
    const deleteRoleObj = async () => {
      
      try
      {
          const jobscoll = collection(db,"Hireup_Db","Jobs","Job_Db");
          const jobdocref = doc(jobscoll,`${selectedjobrole}`);
          const jobdoc = await getDoc(jobdocref);

          if(jobdoc.exists())
          {
            await deleteDoc(jobdocref);

            const {auth} = JSON.parse(localStorage.getItem("hireup"))

            const orgcoll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`);
            const jobrolescreatedref = doc(orgcoll,"JobRolesCreated");
            const jobrolescreateddoc = await getDoc(jobrolescreatedref)

            if(jobrolescreateddoc.exists())
            {
              let arr = [...jobrolescreateddoc.data().rolescreated];
              arr = arr.filter((jobrole) => jobrole.jobid !== selectedjobrole);

              await updateDoc(jobrolescreatedref,{
                "rolescreated":[...arr],
              });

              notification("Job Role Deletion Successfull","success");
            }
            else
              throw new Error("Job Role Deletion Failed");
          }
          else
            throw new Error("Job Role Deletion Failed");

          
      }
      catch(err)
      {
        console.log(err);
      }

    };

    if(selectedjobrole === '')
      notification("Select Job Role","error");
    else
      deleteRoleObj();

  }

  
  useEffect(() => {

    fetchSelectedJobRoleData();

  }, [selectedjobrole])

  useEffect(() => {
    if(role === "Update")
      fetchCreatedRoles();
  });
 

  return (
    <div className="admin-roles">
      <div className="post-section">
        <br />
        <div className="heading">
          <h2>{role} Role</h2>
        </div>
        <br />
        <form>
        <div className="role-vacancy d-flex">
          {role === "Update" ? (
            <div>
              <p>Select Job Role : </p>
              <select name="job-role-update" id="job-role-update" onChange={(e) => setSelectedJobRole(e.target.value)}>
                <option value="" selected disabled hidden>Select Role</option>
                {
                  selectRoles.map((jobcreated,index) => {
                    return <option key={index} value={jobcreated.jobid} >{jobcreated.jobname}</option>
                  })
                }
              </select><span style={{display : loader ? "" : "none"}} className="loadersmall"></span>
            </div>
          ) : (
            ""
          )}

          {
            role === "Create" &&

              <div className="role d-flex">
                <p>Job Role : </p>
                <div>
                  <TextField id="outlined-basic" value={createroles.jobTitle}  size="small" variant="outlined" onChange={(e) => handleCreateRoles("jobTitle",e.target.value)}/>
                </div>
              </div>
          }

          { 
          
            role === "Update" &&

          <div className="role d-flex">
              <p>Edit Job Role : </p>
              <div>
                <TextField id="outlined-basic" value={createroles.jobTitle} size="small" variant="outlined" onChange={(e) => handleCreateRoles("jobTitle",e.target.value)}/>
              </div>
            </div>

          }

          <div className="vacancy d-flex">
            <p>Vacancy : </p>
            <div>
              <TextField id="outlined-basic" value={createroles.vacancy} type="number" size="small" variant="outlined" onChange={(e) => handleCreateRoles("vacancy",e.target.value)}/>
            </div>
          </div>
        </div>
        <br />
        <div className="desc">
          Job Description :<br /> <textarea className="jobdescription" required value={createroles.jobDescription} onChange={(e) => handleCreateRoles("jobDescription",e.target.value)}/>
        </div>
        <br />
        <div className="ctc-location d-flex">
          <div className="ctc d-flex">
            <p>CTC : </p>
            <div>
              <TextField id="outlined-basic" value={createroles.CTC} size="small" variant="outlined" type="number" onChange={(e) => handleCreateRoles("CTC",e.target.value)}/>
            </div>
          </div>
          <div className="location d-flex">
            <p>Location : </p>
            <div>
              <TextField id="outlined-basic" value={createroles.location} size="small" variant="outlined" onChange={(e) => handleCreateRoles("location",e.target.value)}/>
            </div>
          </div>
        </div>
        <br />
        <button type="button" onClick={() => handleUpdateOrCreateRole(role)}  className="btn" style={{marginTop:'20px',width:'150px',marginRight:'25px'}}>
          {role}
        </button>
        <span> </span>
        {role === "Update" ? (
          <button type="button" onClick={() => handledeleteRole()} className="btn" style={{width:'150px'}}>
            Delete
          </button>
        ) : (
          ""
        )}
        </form>
      </div>
    </div>
  );
};

export default Rolecard;
