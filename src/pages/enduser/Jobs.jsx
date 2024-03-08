/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Job from "./Job";
import { TextField } from "@mui/material";
import Header from "../../ParentContComponents/Header";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

function Jobs() {
  
  const [ listOfJobs,setListofJobs ] = useState([]);
  const [jobsList, setJobsList] = useState([]);


  useEffect(() => {

    const fetchJobList = async () => {
        const coll = collection(db,"Hireup_Db","Jobs","Job_Db");

        const unsubscribe = onSnapshot(coll,(docushot) => {

          let temp = [];

          temp = docushot.docs.map((docu) => docu.data());
          
          setListofJobs(temp);

        })
    };

    fetchJobList();
  }, [])

  return (
    <>
      <Header
        btn2="My Dashboard"
        btn1="My Profile"
        typeOfBtn="Logout"
        array={["Find Jobs", "My Profile", "My Dashboard", "Logout"]}
      />
      {/* <div className="searchbar">
        <div className="input">
          <TextField fullWidth id="fullWidth" />
        </div>
        <div className="btn">
          <button className="btn">Search</button>
        </div>
      </div> */}
      {/* <div className="sorting">
        <div className="role">
          <select className="select" name="role" id="role">
            <option value="">Role</option>
            <option value="sde">SDE</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>
        <div className="ctc">
          <select className="select" name="ctc" id="ctc">
            <option value="below3">Below 3,00,000</option>
            <option value="3t05">3,00,000 - 5,00,000</option>
            <option value="5to8">5,00,000 - 8,00,000</option>
            <option value="above8">Above 8,00,000</option>
          </select>
        </div>
        <div className="location">
          <select className="select" name="location" id="location">
            <option value="mumbai">Mumbai</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="delhi">Delhi</option>
            <option value="pune">Pune</option>
            <option value="bangalore">Bangalore</option>
          </select>
        </div>
      </div> */}
      <div className="all-jobs">
        {listOfJobs && listOfJobs.map((job, index) => <Job key={index} job={job} />)}
      </div>
    </>
  );
}

export default Jobs;
