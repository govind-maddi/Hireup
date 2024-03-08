import React, { useContext,useState } from 'react'

import { useNavigate } from "react-router-dom";

import Header from "../ParentContComponents/Header";

import { NotificationContextManager } from '../context/NotificationContext';

import { auth, db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import './styles/login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function CorporateSignup() {

    const [ emailid,setEmailid ] = useState('');
    const [ organisation,setOrganisation ] = useState('')
    const [ password,setPassword ] = useState('');

    const [ checked,setChecked ] = useState('');

    const notification = useContext(NotificationContextManager);

    const navigate = useNavigate();

    const handleCorporateSignup = async(e) => {
/* ElfbF0_I3D_bv */
        e.preventDefault();
        if(checked === "admin")
        {
        
          const orgref = doc(db,"Hireup_Db","Organizations");
          const org = await getDoc(orgref);

          let arr = [];
          arr = orgdocu.data().organization_id.map((item) => item);
          const index = arr.findIndex((item) => item.emailid === emailid);

          if(index !== -1)
          {
            if( arr[index].orgid === organisation )
            {

              createUserWithEmailAndPassword(auth,emailid,password).then(async () => {

                  const orgscoll = collection(orgref,`${organisation}`);
                  const orgdocref = doc(orgscoll,"Details");
                  const orgdoc = await getDoc(orgdocref);

                  if(!orgdoc.exists())
                  {
                    await setDoc(orgdocref,{
                      "orgname":"",
                      "orgwebsite":"",
                      "orglocation":"",
                    });
                  }
                  
                  const adminref = doc(db,"Hireup_Db","Admins");
                  const admin = await getDoc(adminref);
                  arr = [...admin.data().email_id_arr];

                  await updateDoc(adminref,{
                    email_id_arr:[...arr,emailid],
                  });

                  const collectionref = collection(db,"Hireup_Db","Admins",`${emailid}`);
                  const detailsref = doc(collectionref,"Details");
                  const detailsdoc = await getDoc(detailsref);

                  await setDoc(detailsref,{
                    "name":"",
                    "emailid":`${emailid}`,
                    "password":`${password}`,
                    "phoneno":"",
                  });

                  const hireup ={"auth":{"id":`${emailid}`,"orgid":`${organisation}`}};

                  localStorage.setItem("hireup",JSON.stringify(hireup));
                  notification("Successfully Signed Up","success");
                  setTimeout(() => navigate("/user/dashboard"),600);
              })

            }
            else
              notification("Incorrect Organisation Id","error");
          }
          else
            notification("Admin not associated with Organization","error");
          
        }
        else if(checked === "recruiter")
        {

          const orgref = doc(db,"Hireup_Db","Organizations");
          const orgdocu = await getDoc(orgref);

          let arr = [];
          arr = orgdocu.data().organization_id.map((item) => item);
          const index = arr.findIndex((item) => item.orgid === organisation);

          if(index !== 1)
          {
              if(!arr[index].recruiters.includes(emailid))
              {
                createUserWithEmailAndPassword(auth,emailid,password).then(/* async () => {
                  const recruitersdbcoll = collection(db,"Hireup_Db","Organizations",`${organisation}`,"Recruiters","Recruiter_Db");
                  const recruitersdbref =  doc(recruitersdbcoll,`${emailid}`);
                  //const recruiterdb = await getDoc(recruitersdbref);
                  
                  await setDoc(recruitersdbref,{
                    "name":"",
                    "emailid":emailid,
                    "password":password,
                    "phoneno":0,
                    "jobpost":"",
                    "img":"",
                    "status":"",
                    "permission":"",
                    "jobroleassigned":"",
                  });
                  notification("Successfully Signed Up","success");
                  const obj = {"auth":{"id":emailid,"orgid":organisation}};
                  localStorage.setItem("hireup",JSON.stringify(obj));
                  setTimeout(() => navigate("/client/dashboard","error")); 
                  }*/() => console.log("success"),() => notification("Signin Failed Try Again","error"));
              }
              else
                notification("Recruiter already exists Login","error");

          }
          else
            notification("Incorrect Orgnisation Id","error")

        }
          else{
            notification("Select A User","error");
          }
}


  return (
    <>
    <Header btn1="Home" btn2="Become Recruiter" typeOfBtn="Signup" />
      <div>
      <form id='usersignup_form' onSubmit={handleCorporateSignup}>
        <header>Corporate Signup Form</header>
        <input 
          type="email" 
          required
          placeholder='Enter emailid'  
          value={emailid}
          onChange={(e) => setEmailid(e.target.value)}
          
          />

        <input 
          type="text" 
          required
          minLength={5}
          placeholder='Enter your organisation id'  
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          />


        <input 
        type="password" 
        required 
        placeholder='Enter Password'  
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        
        />


            <div className='coprorateuser_selector'>
            <section>
                <input 
                type="radio" 
                id="admin" 
                value={"admin"}
                checked={checked === "admin"} 
                onChange={(e) => setChecked(e.target.value)}
                
                />
                <label htmlFor="admin">Admin</label>
            </section>
            <section>
                <input 
                type="radio" 
                id="recruiter" 
                value={"recruiter"}
                checked={checked === "recruiter"} 
                onChange={(e) => setChecked(e.target.value)}
                
                />
                <label htmlFor="recruiter">Recruiter</label>
            </section>
            
        </div>

        <button type="submit" id='submitbtn'>Signup</button>
        <button type='button' id='submitbtn' onClick={() => navigate('/organisationgenerator')}>Get Your Organisation Id</button>
      </form>
    </div>
    </>
  )
}

export default CorporateSignup