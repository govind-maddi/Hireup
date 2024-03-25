/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "../../ParentContComponents/Header";
import Charts from "../chart/Charts";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

function Dashboard_Client() {
  
  return (
    <>
      <Header
        btn2="My Profile(C)"
        btn1="Pending Applications"
        typeOfBtn="Logout"
        array={[
          "My Dashboard(C)",
          "My Profile(C)",
          "Pending Applications",
          "Logout",
        ]}
      />
      <div className="admin-statistics">
        {/* <Charts
          data={applicants}
          title="Job Applicants"
          options={applicant_title}
        />
        <Charts data={action_roles} title="Actions" options={action_title} /> */}
        <button onClick={async() => {await signOut(auth)}}>Logout</button>
      </div>
    </>
  );
}

export default Dashboard_Client;
