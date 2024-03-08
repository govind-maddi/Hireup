/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AboutusProfile from "./AboutusProfile";
import Govind from "../assets/Govind.jpeg";
import Shantanu from "../assets/Shantanu.jpg";
import Manipoorna from "../assets/Manipoorna.jpeg";


function Aboutus({name,img}) {
  return (
    <>
    <div className="profile-section">
        <center style={{ padding: "2rem" }}>
          <h1>Meet our team</h1>
          <br />
          <h4 className="team-motto">
            Frontend finesse meets backend mastery, crafting
            seamless digital experiences that elevate user satisfaction and
            drive innovation forward.
          </h4>
        </center>
        <div className="profiles">
          <AboutusProfile name="GovindRaj (Frontend Dev)" img={Govind} />
          <AboutusProfile name="Mani Poorna (Frontend Dev)" img={Manipoorna} />
          <AboutusProfile name="Shiva Sai (Backend Dev)" img="" />
          <AboutusProfile name="Asutosh (Backend Dev)" img="" />
          <AboutusProfile name="Shantanu (Backend Dev)" img={Shantanu} />
        </div>
      </div>
    </>
  );
}

export default Aboutus;
