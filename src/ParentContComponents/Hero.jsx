import hero from "../assets/OBJECTS.png"
import Bodysection from "./Bodysection.jsx";
import frame from "../assets/Frame 7.png";

import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate(); 
  return (
    <>
      <div className="hero-section d-flex">
        <div className="left d-flex">
          <div className="heading">
            <h1>
              Welcome to <span className="span-color">Resume Reader</span>
            </h1>
          </div>
          <div className="para">
            <p>
              One way solution to all resume parser needs One way solution to
              One way solution to all resume parser needs One way solution to
              all resume parser needs
            </p>
          </div>
          <div className="details d-flex">
            <p>45000+ Resumes Scanned</p>
            <p>234+ 5-star Reviews</p>
          </div>
          <div className="register-button">
            <button onClick={()=>navigate("/signup")} className="signin">Get Started</button> *Sign in Required
          </div>
        </div>
        <div className="right">
          <img src={hero} alt="image" />
        </div>
      </div>
      <Bodysection
        heading="NLP Processor Integration"
        description="Resumo boasts an NLP processor that swiftly extracts vital information from resumes, streamlining applicant data acquisition and analysis effortlessly."
        image={frame}
        style="normal"
      />
      <Bodysection
        heading="Integrated Parser for JD Matching"
        description="With an integrated parser, Resumo seamlessly aligns job descriptions with applicant resumes, presenting a refined list of top candidates suited for the role."
        image={frame}
        style="reverse"
      />
      <Bodysection
        heading="Cloud Storage with Enhanced Security"
        description="Resumo securely stores data on cloud servers for convenient access, implementing robust security measures to safeguard sensitive information against unauthorized access or breaches."
        image={frame}
        style="normal"
      />
    </>
  );
}

export default Hero