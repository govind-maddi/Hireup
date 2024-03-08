/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";


function ResumeViewer() {
  const [resumeimg, setResumeImg] = useState();

  useEffect(() => {
    const fetchResume = async () => {
      const resumeid = localStorage.getItem("resumeid");
      const response = await fetch(/* someapi for reusme png */);
      const data = await response.json();
      setResumeImg(data);
    };
    //fetchResume();
  }, []);

  function closeResume() {
    localStorage.removeItem("resumeid");
  }



  return (
    <div className='resume-viewer-div'>
      
    <div className="resume-viewer">
      <CloseIcon onClick={()=>closeResume()} size="large" className="close-icon" />
      {/* dialog box */}
      {/* high quality png image */}
      {resumeimg}
    </div>
    </div>
  );
}

export default ResumeViewer