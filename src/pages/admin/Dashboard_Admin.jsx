/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Header from "../../ParentContComponents/Header";
import Charts from "../chart/Charts";
import { useEffect, useState } from "react";

function Dashboard_Admin() {
  const navigate = useNavigate();

  const [organisationdetails, setOrganisationDetails] = useState();
  const [adminStats, setAdminStats] = useState();
  //async call in useEffect to fetch organisation details of admin
  const fetchOrganisationDetails = async () => {
    const resp = await fetch(/* some api call to fetch details */);
    const data = resp.json();
    setOrganisationDetails(data);
  };

  const fetchAdminStats = async () => {
    const resp = fetch(/* someapi call to fetch stats */);
    const data = resp.json();
    setAdminStats(data);
  };

  useEffect(() => {
    // fetchOrganisationDetails();
    // fetchAdminStats();
  }, []);

  const all_roles = [
    ["Task", "Percentage"],
    ["SDE", 5],
    ["Frontend", 2],
    ["Backend", 3],
  ];
  const roles_title = {
    title: "Roles",
  };

  const recruiter_roles = [
    ["Task", "Percentage"],
    ["Approver", 5],
    ["Reviewer", 5],
    ["Commentor", 5],
  ];
  const recruiter_title = {
    title: "Recruiters",
  };

  const logout = async() => {
    const resp = await fetch(`${localStorage.getItem("baseUrl")}/auth/logout`, {
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    });

    localStorage.removeItem("jwttoken");

    alert(resp.text);
  }

  return (
    /* build stats and just insert the data through stats */
    <>
      <Header
        btn1="Manage Requests"
        btn2="My_Profile"
        typeOfBtn="Logout"
        array={["Manage Requests", "My_Profile", "My DashBoard", "Logout"]}
      />
      <button className="btn" onClick={logout}>Logout</button>
      <div className="admin-statistics">
        <button
          onClick={() => navigate("/admin/roles")}
          className="btn create-btn">
          Create / Update Job Roles
        </button>
        <Charts data={all_roles} title="Roles" options={roles_title} />
        <Charts
          data={recruiter_roles}
          title="Recruiters created"
          options={recruiter_title}
        />
      </div>
    </>
  );
}
export default Dashboard_Admin;
