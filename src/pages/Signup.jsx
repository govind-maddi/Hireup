/* eslint-disable no-unused-vars */
import React,{ useContext, useState } from 'react'

import Header from "../ParentContComponents/Header";
import { Link, useNavigate} from "react-router-dom";

import './styles/login.css';
import { NotificationContextManager } from '../context/NotificationContext';

import { auth, db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {

  const [ emailid,setEmailid ] = useState('');
  const [ password,setPassword ] = useState('');

  const notification = useContext(NotificationContextManager);
  const navigate = useNavigate();

  const handleSignup = async(e) => {

    e.preventDefault();
    
      createUserWithEmailAndPassword(auth,emailid,password).then(async() => {
        const coll = collection(db,"Hireup_Db","EndUsers","User_Db");
        const docref = doc(coll,`${emailid}`);
        const docu = await getDoc(docref);
        if(!docu.exists())
        {
          await setDoc(docref,{
            "name":"",
            "email":emailid,
            "password":password,
            "phoneno":0,
            "resumes":[],
            "jobsappliedto":[],
            "img":"",
          })
  
          const hireup = {"auth":{"id":emailid}};
          localStorage.setItem("hireup",JSON.stringify(hireup));
  
          notification("Successfully Signed Up","success");
  
          setTimeout(() => navigate("/user/dashboard"),600);
        }
        else
          notification("Email Already Exists Login","error");
      },() => notification("Signup Failed","error"))
    
    
  }

  return (
    <>
      <Header btn1="Home" btn2="Become Recruiter" typeOfBtn="Login" />
      <div>
      <form id='usersignup_form' onSubmit={handleSignup}>
        <header>SignUp Form</header>
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


        <button type="submit" id='submitbtn'>Signup</button>

        <section id='corporate_redirect'>
          <article><Link to='/corporate_signup'>Are you a corporate user ?</Link></article>
        </section>
      </form>
    </div>
    </>
  );
}

export default Signup;
