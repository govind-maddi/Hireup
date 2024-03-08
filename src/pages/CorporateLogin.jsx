import React, { useContext, useEffect } from 'react'

import Header from "../ParentContComponents/Header";
import Input from "./inputbox/Input";

import { Link, json, useNavigate } from "react-router-dom";

import './styles/login.css';
import { useState } from "react";
import { NotificationContextManager } from '../context/NotificationContext';

function CorporateLogin() {

    const [ emailid,setEmailid ] = useState('');
    const [ organisation,setOrganisation ] = useState('');
  const [ password,setPassword ] = useState('');

  const [ checked,setChecked ] = useState('');

  const notification = useContext(NotificationContextManager);

  const navigate = useNavigate();

  const handleCorporateLogin = async(e) => {

    e.preventDefault();
    const hireup = {"auth":{"id":emailid,"orgid":"ElfbF0_I3D_bv"}}
    localStorage.setItem("hireup",JSON.stringify(hireup));
    navigate("/admin/dashboard");
    /* if(checked === "admin")
    {
      try
      {
          console.log(`${localStorage.getItem("baseUrl")}/auth/login`);
          const resp = await fetch(`${localStorage.getItem("baseUrl")}/auth/login`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({"email":emailid,'password':password}),
          });
      
        if(!resp.ok)
        {
          notification("Invalid Credentials","error");
        }
        else 
        {
          const data = await resp.json();
          localStorage.setItem("jwttoken",data.jwt_token);
          localStorage.setItem("adminid",data.email_id);

          notification("Successfully Logged In","success");
        
          setTimeout(() => navigate('/admin/dashboard'),500);
        }
      }
      catch(err)
      {
        notification("Login Failed","error");
        console.log(err.msg);
      }
    }
    else if(checked === "recruiter")
    {
      try
      {
          const resp = await fetch("/recruiter/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({"email":emailid,'password':password}),
          });
        
          if(!resp.ok)
        {
          notification("Invalid Credentials","error");
        }
        else 
        {
          const data = await resp.json();
          localStorage.setItem("jwttoken",data.jwt_token);
          localStorage.setItem("recruiterid",data.email_id);
          notification("Successfully Logged In","success");

          setTimeout(() => navigate('/client/dashboard'),500);
        }
      }
      catch(err)
      {
        notification("Login Failed","error")
        console.log(err.msg);
      }
    } */
    /* else
    {
      notification("Select User","error");
    } */
  }

  return (
    <>
        <Header btn1="Home" btn2="Become Recruiter" typeOfBtn="Signup" />
      <div>
      <form id='usersignup_form' onSubmit={handleCorporateLogin}>
        <header>Corporate Login Form</header>
        <input 
          type="email" 
          required
          placeholder='Enter emailid'  
          value={emailid}
          onChange={(e) => setEmailid(e.target.value)}
          
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

        <button type="submit" id='submitbtn'>Login</button>

        
      </form>
    </div>
    </>
  )
}

export default CorporateLogin