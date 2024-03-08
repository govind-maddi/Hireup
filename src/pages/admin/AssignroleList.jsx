import { useEffect, useState } from "react";
import Assignrole from "./Assignrole";
import BasicError from "../../pagecomponents/enduser/errorcomp/BasicError";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";



const AssignroleList = () => {
  
  const [ recruiterlist,setRecruiterList ] = useState([]);
  const [ loader,setLoader ] = useState(false);

  const [selectRoles,setSelectRoles] = useState([]);

  const [ fetchstatus, setFetchStatus] = useState(false);

  const fetchRecruiterList = async() => {
    try
    {
      setLoader(true);
      const {auth} = JSON.parse(localStorage.getItem("hireup"));
      const coll = collection(db,"Hireup_Db","Organizations",`${auth.orgid}`,"Recruiters","Recruiter_Db");
      
      const unsubscribe = onSnapshot(coll,(docushot) => {
        
        let temp = [];
        temp = docushot.docs.map((docu) => docu.data());

        temp = temp.filter((item) => item.status === "APPROVED");

        temp = temp.map(async (item) => {
          const coll = collection(db,"Hireup_Db","Jobs","Job_Db");
          if(item.jobroleassigned)
          {
            const docref = doc(coll,`${item.jobroleassigned}`);
            const docu = await getDoc(docref);
            if(!docu.exists())
            {
              return {...item,"jobroleassigned":""}
            }
            else
              return {...item}
          }
          else
            return {...item}
        })
        
        Promise.all(temp).then((values) => {setRecruiterList(values);setLoader(false)});

        //setRecruiterList(temp);
      });
      setFetchStatus(false);

    }
    catch(err)
    {
      setFetchStatus(true);
      setLoader(false);
      console.log(err);
    }
  }
  
  useEffect(() => {

    fetchRecruiterList();
    
  }, [])

  useEffect(() => console.log(recruiterlist),[recruiterlist]);

  return (
    <div className="assign-list">
      {
          loader ? 

          <div id="loadercont">
          <span className="loader"></span>
          <label>Loading Recruiters</label>
          </div> :

          fetchstatus ? 

              <BasicError/> :

                  recruiterlist && recruiterlist.map((person, index) => (
                  <Assignrole key={index} person={person}/>
                  ))

      }
    </div>
  )
}

export default AssignroleList