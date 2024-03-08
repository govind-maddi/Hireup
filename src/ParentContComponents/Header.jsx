/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./style.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";

function Header({ typeOfBtn, btn1, btn2,array }) {
 const [anchorEl, setAnchorEl] = useState(null);
 const open = Boolean(anchorEl);
 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };
 const handleClose = (e) => {
   setAnchorEl(null);
   handleNavigate(e);
 };
  const navigate = useNavigate(); 

  function handleNavigate(event) {
    if (event.target.innerText === "Find Jobs") {
      navigate("/user/jobs");
    } else if (event.target.innerText === "My Dashboard") {
      navigate("/user/dashboard");
    } else if (event.target.innerText === "My Profile") {
      navigate("/user/profile");
    } else if (event.target.innerText === "My_Profile") {
      navigate("/admin/profile");
    } else if (event.target.innerText === "Manage Requests") {
      navigate("/admin/clients");
    } else if (event.target.innerText === "My DashBoard") {
      navigate("/admin/dashboard");
    }
    else if (event.target.innerText === "My Dashboard(C)") { 
      navigate("/client/dashboard");
      console.log(event.target.innerText);
    }
    else if (event.target.innerText === "My Profile(C)") {
      navigate("/client/profile");
      console.log(event.target.innerText);
    }
    else if (event.target.innerText === "Pending Applications") {
      console.log(event.target.innerText);
      navigate("/client/:clientid/roles");
    }
  }
  return (
    <>
      <div className="d-flex header">
        <div className="left">
          <h3>ReSUMO</h3>
        </div>
        <div className="right ">
          <ul type="none" className="d-flex">
            <li onClick={(e) => handleNavigate(e)}>{btn1}</li>
            <li onClick={(e) => handleNavigate(e)}>{btn2}</li>
            <li>
              <button onClick={() => navigate("/signup")} className="signin">
                {typeOfBtn}
              </button>
            </li>
          </ul>
        </div>
        <div className="hamburger">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}>
            <MenuIcon className="menu-icon" />
          </Button>
          <Menu
            className="menu"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}>
            {array &&
              array.map((option, index) => (
                <MenuItem key={index}  onClick={(e) => handleClose(e)}>
                  {option}
                </MenuItem>
              ))}
          </Menu>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default Header;