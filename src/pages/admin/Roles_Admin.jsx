/* eslint-disable no-unused-vars */
import Recruitrole from "./Recruitrole";
import Createrole from "./Createrole.jsx";
import { useEffect, useState } from "react";
import AssignroleList from "./AssignroleList.jsx";
import Header from "../../ParentContComponents/Header.jsx";
import LoginError from "../../pagecomponents/enduser/errorcomp/LoginError.jsx";
import Unauthorization from "../../pagecomponents/enduser/errorcomp/Unauthorization.jsx";


function Roles_Admin() {
  // UsuseState for changing form according to role
  const [role, setRole] = useState("create")

  const [errortype,setErrorType] = useState("");

  return (
    <>
      <Header
        btn1="Manage Requests"
        btn2="My DashBoard"
        typeOfBtn="Logout"
        array={["Manage Requests", "My_Profile", "My DashBoard", "Logout"]}
      />

    
      <div className="role-controller">
          <button
            onClick={() => setRole("create")}
            className={role === "create" ? "tabbtn active" : "tabbtn"}>
            Create
          </button>
          <span> </span>
          <button
            onClick={() => setRole("assign")}
            className={role === "assign" ? "tabbtn active" : "tabbtn"}>
            Assign
          </button>
          <span> </span>
          <button
            onClick={() => setRole("manage")}
            className={role === "manage" ? "tabbtn active" : "tabbtn"}>
            Manage
          </button>
      </div>
      {role === "create" && <Createrole role="Create"/>}
      {role === "assign" && <AssignroleList />}
      {role === "manage" && <Createrole role="Update" />  }

    </>
  );
}

export default Roles_Admin