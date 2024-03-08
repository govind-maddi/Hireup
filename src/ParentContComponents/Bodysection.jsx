/* eslint-disable react/prop-types */

const Seciton = ({ style, heading, description, image }) => {
  const style1 = {
    backgroundColor: "#F6FFF8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    padding: "2rem 4rem",
  };
  const style2 = {
    backgroundColor: "#F6FFF8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: "4rem",
  };

  return (
    <div className="body-section" style={style === "reverse" ? style1 : style2}>
      <div className="left">
        <img style={{ width: "80%" }} src={image} alt="image" />
      </div>
      <div className="right">
        <h2 style={{ color: "#00BFB3" }}>{heading}</h2>
        <br />
        <p style={{ width: "90%" }}>{description}</p>
      </div>
    </div>
  );
};

export default Seciton;
