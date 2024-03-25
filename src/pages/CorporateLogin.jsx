import React, { useContext, useEffect } from 'react'

import Header from "../ParentContComponents/Header";
import Input from "./inputbox/Input";

import { Link, json, useNavigate } from "react-router-dom";

import './styles/login.css';
import { useState } from "react";
import { NotificationContextManager } from '../context/NotificationContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

function CorporateLogin() {

    const [ emailid,setEmailid ] = useState('');
    const [ organisation,setOrganisation ] = useState('');
  const [ password,setPassword ] = useState('');
  const [ loader,setLoader ] = useState(false);

  const [ checked,setChecked ] = useState('');

  const notification = useContext(NotificationContextManager);

  const navigate = useNavigate();

  const handleCorporateLogin = async(e) => {

    e.preventDefault();
    
    if(checked === "admin")
    {
      setLoader(true);
      signInWithEmailAndPassword(auth,emailid,password).then(async() => {

          const orgref = doc(db,"Hireup_Db","Organizations");
          const orgdocu = await getDoc(orgref);

          let arr = [];
          arr = orgdocu.data().organization_id.map((item) => item);
          const index = arr.findIndex((item) => item.emailid === emailid);

          if(index !== -1)
          {
            if(arr[index].orgid === organisation)
            {
              notification("Successfully Signed In","success");
              const hireup = {"auth":{"id":emailid,"orgid":organisation}};
              localStorage.setItem("hireup",JSON.stringify(hireup));
              setTimeout(() => navigate("/admin/dashboard"),600);
            }
            else
              throw new Error("Invalid Org Id");
          }
          else
            throw new Error("Invalid Email Id");


      },() => {
        notification("Signup Failed Try Again","error");
      }).catch((err) => notification(err.message,"error"));
      setLoader(false);
    }
    else if(checked === "recruiter")
    {
      setLoader(true);
        signInWithEmailAndPassword(auth,emailid,password).then(async() => {
        
        const orgref = doc(db,"Hireup_Db","Organizations");
        const orgdocu = await getDoc(orgref);

        let arr = [];
        arr = orgdocu.data().organizations_id.map((item) => item);
        const index = arr.findIndex((item) => item.orgid === organisation);

        if(index !== -1)
        {
          if(arr[index].recruiters.includes(emailid))
          {
            const hireup = {"auth":{"id":emailid,"orgid":organisation}};
            localStorage.setItem("hireup",JSON.stringify(hireup));
            setTimeout(() => {
              navigate("/client/dashboard");
              notification("Successfully Signed In","success");
            },600);
            
            
          }
          else
            throw new Error("Invalid Email Id","error");
        }
        else
          throw new Error("Invalid Org Id","error");

      },() => {
        notification("Signup Failed Try Again","error");
      }).catch((err) => notification(err.message,"error"));
      setLoader(false);
    }
    else
      notification("Select A User","error");
  }
    

  return (
    <>
        <Header btn1="Home" btn2="Become Recruiter" typeOfBtn="Signup" />
      <div>
      <form id='usersignup_form' onSubmit={handleCorporateLogin}>
        <header>Corporate Signin</header>
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
          placeholder='Enter orgid'  
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

        <button type="submit" id='submitbtn' className='btnclass'>

        {
            loader ? 
            <> <span className="loadersmall" style={{position:'relative',top:'-1px',marginRight:'10px'}}></span> <span>Signing. . .</span> </> :
            "SignIn"
        }

        </button>

        
      </form>
    </div>
    </>
  )
}

export default CorporateLogin