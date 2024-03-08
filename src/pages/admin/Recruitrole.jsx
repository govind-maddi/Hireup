import { TextField } from "@mui/material";

const Recruitrole = () => {
  return (
    <div className="recruit-role">
      <div className="heading">
        <h2>Recruiter Role : </h2>
      </div>
      <br />
      <div className="role-vacancy d-flex">
        <div className="role d-flex">
          <p>Job Role : </p>
          <div>
            <select className="select" name="" id="">
              <option value="sde">SDE</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="analyst">Analyst</option>
            </select>
          </div>
        </div>
        <div className="vacancy d-flex">
          <p>Vacancy : </p>
          <div>
            <TextField id="outlined-basic" size="small" variant="outlined" />
          </div>
        </div>
      </div>
      <br />
      <div className="btns">
        <button className="btn">Update</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

export default Recruitrole