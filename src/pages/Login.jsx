import Header from "../ParentContComponents/Header";
import Input from "./inputbox/Input";

import { Link, json, useNavigate } from "react-router-dom";

import './styles/login.css';
import { useState } from "react";

function Login() {
  

  const [ emailid,setEmailid ] = useState('');
  const [ password,setPassword ] = useState('');

  const navigate = useNavigate();

  const handleLogin = async(e) => {

    localStorage.setItem("hireup",JSON.stringify({"auth":{"id":emailid}}));
    navigate("/user/dashboard");
    
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
