/* eslint-disable react/prop-types */
import Avatar from "@mui/material/Avatar";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import XIcon from "@mui/icons-material/X";

const AboutusProfile = ({name,img}) => {
  return (
    <div className="profile">
      <Avatar
        className="image"
        alt="Remy Sharp"
        src={img}
        sx={{ width: 180, height: 200 }}
      />
      <br />
      <div className="description">
        <h3 className="profile-heading">{name}</h3>
        <FacebookIcon
          className="icon"
          color="primary"
          sx={{ width: 30, height: 30 }}
        />
        <LinkedInIcon
          className="icon"
          color="primary"
          sx={{ width: 30, height: 30 }}
        />
        <EmailIcon
          className="icon"
          color="primary"
          sx={{ width: 30, height: 30 }}
        />
        <XIcon
          className="icon"
          color="primary"
          sx={{ width: 25, height: 30 }}
        />
      </div>
    </div>
  );
}

export default AboutusProfile