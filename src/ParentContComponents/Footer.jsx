import linkedin from "../assets/linkedin.png";
import mail from "../assets/mail.png";


function Footer() {
  return (
    <div className="d-flex footer">
      <div className="left">
        <div>Contact Us</div>
        <ul type="none">
          <li>
            <img src={linkedin} alt="linkedin" />
          </li>
          <li>
            <img src={mail} alt="mail" />
          </li>
          <li>
            <img src={linkedin} alt="linkedin" />
          </li>
          <li>
            <img src={mail} alt="mail" />
          </li>
        </ul>
      </div>
      <div className="middle">
        <button className="signin">
          <a>Back to Top ^</a>
        </button>
      </div>
      <div className="right">
        <h3>Address</h3>
        <p>
          XYZ Building, XYZ Road <br />
          ABC City, India
        </p>
      </div>
    </div>
  );
}

export default Footer