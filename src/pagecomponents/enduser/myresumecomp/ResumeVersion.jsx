/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function ResumeVersion({ version, handleSelectedValue, deleteResumeVersion }) {
  /* func call to make the current version marked */
  const markResume = async () => {
    const resp =
      await fetch(/* some api call to make current version marked */);
    const data = await resp.json();
    handleSelectedValue(version.id);
  };

  return (
    <div onClick={markResume()}>
      Resume 1.0
      {/* <FormControlLabel
        control={<Radio />}
        value={item.id}
        checked={selectedValue === item.id}
        onChange={markResume}
      /> */}
    </div>
  );
}

export default ResumeVersion;
