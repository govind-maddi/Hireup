/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import ResumeVersion from './myresumecomp/ResumeVersion';

function ResumeManage() {

  const [ versionList,setVersionList ] = useState([]);
  const [ selectedvalue,setSelectedValue ] = useState();

  //func to upload resume version( max 3 )
  const uploadResumeVersion = async () => {
    
    if( versionList.length >= 3 )
      return;
    /* else
    {

    } */

  }
  //func to delete resume version
  const deleteResumeVersion = async ( version ) => {

    setVersionList((prevVersionList) => {
      prevVersionList.pop(version);
    })

    const response = await fetch(/* some api call to delete the resume in db(backend) */)
    const data = await response.json();

  }

  //func to select the resume
  const handleSelectedValue = (version_id) => {
    setSelectedValue(version_id);
  }

  //async call in useEffect to fetch versions
  useEffect(() => {

    const fetchVersions = async() => {
      const response = await fetch(/* someapicall for resume version */);
      const data = response.json();
      setVersionList(data);
    }

    //fetchVersions();

  }, [])

  return (
    <div>

      {/* dialog box */}
      Resume Manage
      {
        versionList.map((version) => {

          if( version.id === "marked" ) setSelectedValue(version.id);
          return <ResumeVersion version={ version } deleteResumeVersion = { deleteResumeVersion } handleSelectedValue = { handleSelectedValue }/>
        
        })
      }
    </div>
  )
}

export default ResumeManage