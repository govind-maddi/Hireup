/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";

function FilterApplications() {
  const [jobroles, setJobRoles] = useState([]);
  const [jobcities, setJobCities] = useState([]);
  const [joblocations, setJobLocations] = useState([]);
  //async call in useEffect to get all job roles,job ctcs,job locations
  useEffect(() => {
    const createFilters = async () => {
      const resp =
        await fetch(/* some api call to get job applications applied bu user */);
      const data = await resp.json();
      data.forEach((application) => {
        setJobRoles((prevRoles) => [...prevRoles, application.jobrole]);
        setJobCities((prevCities) => [...prevCities, application.jobcities]);
        setJobLocations((prevlocations) => [
          ...prevlocations,
          application.joblocations,
        ]);
      });
    };
  }, []);

  return (
    <div>Application</div>
    )
}

export default FilterApplications;
