/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/* page comps of dashboard_user */
import MyResumes from "../../pagecomponents/enduser/MyResumes";
import MyStats from "../../pagecomponents/enduser/MyStats";
import MyApplications from "../../pagecomponents/enduser/MyApplications";

/* dynamic comps of dashboard */
import ResumeViewer from "../../pagecomponents/enduser/ResumeViewer";
import ResumeManage from "../../pagecomponents/enduser/ResumeManage";
import Header from "../../ParentContComponents/Header";

//context to handle dynamic comp
export const ResumeFlags = createContext();

function Dashboard_User() {
  //dynamic comp state logic
  const [viewerflag, setViewerFlag] = useState(false);
  const [versionmanageflag, setVersionManageFlag] = useState(false);

  //handle dynamic comp state
  const handleViewerFlag = (boolvalue) => {
    setViewerFlag(boolvalue);
  };

  const handleVersionManageFlag = (boolvalue) => {
    setVersionManageFlag(boolvalue);
  };

  /* useEffect(() => {
        console.log(obj);
    },[ ]); */

  return (
    <>
      <Header
        typeOfBtn="Logout"
        btn1="My Profile"
        btn2="Find Jobs"
        array={["Find Jobs", "My Profile", "My Dashboard", "Logout"]}
      />
      <div className="user-dashboard">
        {/* context */}
        <ResumeFlags.Provider
          value={{
            viewerflag,
            handleViewerFlag,
            versionmanageflag,
            handleVersionManageFlag,
          }}>
          <MyResumes />
        </ResumeFlags.Provider>
        <br />
        <MyStats />
        <br />
        <MyApplications />

        {/* dyanmic comp */}
        {viewerflag === true && <ResumeViewer />}
        {versionmanageflag === true && <ResumeManage />}
      </div>
    </>
  );
}

export default Dashboard_User;
