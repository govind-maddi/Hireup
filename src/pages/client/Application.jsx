/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Commentbox from "./Commentbox";

const Application = ({application}) => {
  

  const getPdf = async (link) => {
        try {
            /* const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob); */
            const a = document.createElement('a');
            a.href = link;
            a.target = '_blank'; // Specify the file name here
            document.body.appendChild(a);
            a.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

  useEffect(() => {
    // checkPermission();
  }, []);



  return (
    <>
      <div className="application">
        <div className="name">
          <h3>{application.userid}</h3>
        </div>
        <div className="downloadicon">
        <DownloadIcon
            onClick={() => getPdf(application.resumelink)}
            className="eye-icon"
            fontSize="small"
          />
        </div>
        <div className="actions">
          <button
            onClick={(e) => performAction(e.target.value)}
            className="permissionactionbtn">
            Approve
          </button>
        </div>
      </div>
    </>
  );
};

export default Application;
