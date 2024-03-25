import { collection, doc, getDoc,updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebase/config";
import { NotificationContextManager } from "../../context/NotificationContext";

const Commentbox = ({ jobid,applicationid,setComment }) => {

 
  const [ text,setText ] = useState("");
  const notification = useContext(NotificationContextManager);

  const handleText = async() => {

    const coll1 = collection(db,"Hireup_Db","Jobs","Job_Db",`${jobid}`,"UsersApplied_Db");
    const docref = doc(coll1,`${applicationid}`);
    const docu = await getDoc(docref);

    updateDoc(docref,{
      "comments":[...docu.data().comments,text],
      "status":"REJECTED",
    }).then(() => notification("Rejected User Application","success"),() => notification("Rejection Of User Application Failed","error"));
  }


  return (
    <div className="comment-box">

    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" id="closebtn" viewBox="0,0,256,256" onClick={() => setComment(false)}>
    <g fill="#ea0c0c" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8.53333,8.53333)"><path d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"></path></g></g>
    </svg>

      <div className="bottom" style={{marginTop:'10px'}}>
        <p>Comment : </p>
        <br />
        <textarea id="comment" name="comment" rows={10} cols={40} onChange={(e) => setText(e.target.value)}/>
      </div>
        <button className="btn" style={{width:'150px',textAlign:'center',margin:"0 auto"}} onClick={handleText}>Submit</button>
    </div>
  );
};

export default Commentbox;
