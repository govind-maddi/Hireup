/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./dashboard.css"
import Charts from "../../pages/chart/Charts";


function MyStats() {
  const [stats, setStats] = useState([]);
  //async call in useEffect to fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      const resp = await fetch(/* some api call to fetch user details */);
      const data = await resp.json();
      setStats(data);
      console.log("Statistics data=> ",data)
    };
  }, []);

  const data = [
    ["Task", "Percentage"],
    ["Approved", 2],
    ["Rejected", 1],
    ["pending", 3],
  ];
  const options = {
    title: "Resumes Status",
  };

  return (
    /* build stats and just insert the data through stats */
    <div className="statistics">
      <Charts data={data} title="Resumes Status" options={options} />
    </div>
  );
}

export default MyStats;
