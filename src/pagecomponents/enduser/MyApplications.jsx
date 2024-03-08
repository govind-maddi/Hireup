/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import UserJobApplication from "./myapplications/UserJobApplication";
import FilterApplications from "./myapplications/FilterApplications";

import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function MyApplications() {
  const [applications, setApplicationsList] = useState([]);

  const closeComment = () => {
    setCommentFlag(false);
  }

  useEffect(() => {
    const fetchJobApplications = async () => {

      const {auth} = JSON.parse(localStorage.getItem("hireup"));

      const coll1 = collection(db,"Hireup_Db","EndUsers","User_Db");
      const docref1 = doc(coll1,`${auth.id}`);
      
      onSnapshot(docref1,(docu) => {
        if(docu.exists())
        {
          let temp = docu.data().jobsappliedto.map((item) => item);

          setApplicationsList(temp);
        }
      })
      


    };
    fetchJobApplications();
  }, []);

  //const applications = [1,2,3,4,5,6,7,8];


  return (
    <div className="my-applications">
      {/* <FilterApplications /> */}
      <div className="application-status">
        <header className="section_header" >My <span className="section_header_ul">Applications</span></header>
        <div className="assign_list">
        <div className="assignlist_item" style={{fontWeight:"600"}}>
          <div className="s-no">S.No</div>
          <div className="company-name">Job Role</div>
          <div className="package">Job CTC</div>
          <div className="job-status">Status of Job</div>
          <div className="job-status">Actions</div>
        </div>
        {applications.map((application, index) => {
          return (
            <UserJobApplication
              key={index}
              application={application}
              // deleteUserJobApplication={deleteUserJobApplication}
              serialnumber={index}
            />
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
