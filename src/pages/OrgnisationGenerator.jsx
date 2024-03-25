import React, { useContext, useRef, useState } from 'react';

import emailjs from "@emailjs/browser";
import { NotificationContextManager } from '../context/NotificationContext';

import './styles/login.css'
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function OrgnisationGenerator() {

    const [ emailid,setEmailId ] = useState("");
    const [ org, setOrg ] = useState("");

    const msg = useRef(null);
    const form = useRef(null);

    const [ loader,setLoader ] = useState(false);

    const notification = useContext(NotificationContextManager);

    const handleOrganisationGenerator = async(e) => {

        e.preventDefault();

        setLoader(true);

        const temp = `${org.charAt(0)}${org.charAt(1)}${org.charAt(2)}`;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let orgid = temp+'';

        for (let i = 0; i < 8; i++) {
            if (i > 0 && i % 3 === 0) {
                orgid += '_';
            }
            orgid += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        msg.current.value = orgid;

        const orgref =  doc(db,"Hireup_Db","Organizations");
        const orgdocu = await getDoc(orgref);

        let arr = [];
        arr = orgdocu.data().organization_id.map((item) => item);
        const index = arr.findIndex((item) => item.emailid === emailid);
        
        console.log(index);
        if(index === -1)
        {
            arr.push({"orgid":orgid,"emailid":emailid,"recruiters":[]});
            updateDoc(orgref,{"organizations_id":arr}).
                then(() => {
                
                    emailjs.sendForm('service_l84dpv7','template_euggxy3',form.current,{
                        publicKey:'4OXjRKfbWVwxmSdVA',
                    }).then(() => {
                    
                                    notification("Organisation Id Sent to mentioned Email","success");
                                },(err) => {notification("Failed To Send Email","error");console.log(err)},);
                });
        }
        else
        {
            notification("Organisation Already Exists","error");
        }
        
        setLoader(false);
    }

/* 4OXjRKfbWVwxmSdVA */
/* template_euggxy3 */
/* service_I84dpv7 */
  return (
    <div>
        <form id='usersignup_form' onSubmit={handleOrganisationGenerator}>
        <header>Generate Organisation Id</header>
        <input 
          type="email" 
          required
          placeholder='Enter emailid'  
          value={emailid}
          onChange={(e) => setEmailId(e.target.value)}
          
          />

        <input 
          type="text" 
          required
          placeholder='Enter Organisation'  
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          
          />

          <button type='submit' id='submitbtn' className='btnclass'>

          {
            loader ? 
            <> <span className="loadersmall" style={{position:'relative',top:'-1px',marginRight:'10px'}}></span> <span>Generating. . .</span> </> :
            "Get Id"
          }

          </button>
        </form>

        <form ref={form} style={{display:'none'}}>
            <label>Email</label>
            <input type="email" name="user_email" value={emailid}/>
            <label>Message</label>
            <textarea name="message" ref={msg}/>
        </form>

    </div>

    

  )
}

export default OrgnisationGenerator