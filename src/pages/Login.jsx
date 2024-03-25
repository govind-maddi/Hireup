import Header from "../ParentContComponents/Header";
import Input from "./inputbox/Input";

import { Link, json, useNavigate } from "react-router-dom";

import './styles/login.css';
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { NotificationContextManager } from "../context/NotificationContext";
import { collection,doc,getDoc } from "firebase/firestore";

function Login() {
  

  const [ emailid,setEmailid ] = useState('');
  const [ password,setPassword ] = useState('');

  const notification = useContext(NotificationContextManager);

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth,emailid,password).then(async() => {
      const coll =collection(db,"Hireup_Db","EndUsers","User_Db");
      const docref = doc(coll,`${emailid}`);
      const docu = await getDoc(docref);

      if(docu.exists())
      {
        notification("Sign In Successfull","success");
        localStorage.setItem("hireup",JSON.stringify({"auth":{"id":emailid}}));
        setTimeout(() => navigate("/user/dashboard"),600);
      }
      else
        notification("Email Not Present Sign Up","error");

    },() => notification("Sign In Failed","error"));

    
    
  }

  return (
    <>
      <Header btn1="Home" btn2="Become Recruiter" typeOfBtn="Signup" />
      <div>
      <form id='usersignup_form' onSubmit={handleLogin}>
        <header>Login Form</header>
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


        <button type="submit" id='submitbtn'>Login</button>

        <section id='corporate_redirect'>
          <article><Link to='/corporate_login'>Are you a corporate user ?</Link></article>
        </section>
      </form>
    </div>
    </>
  );
}

export default Login;
