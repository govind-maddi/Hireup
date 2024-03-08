const Commentbox = () => {
  return (
    <div className="comment-box" style={{textAlign:'center'}}>
      <div className="radio_selection">
        <p>Is it a Rejection Message?</p>
        <div className="radiobtn">
          <input type="radio" name="yes" id="yes" />
            <label htmlFor="yes">Yes</label>
          <input type="radio" name="no" id="no" />
          <label htmlFor="no">No</label>
        </div>
      </div>
      <div className="bottom">
        <p>Comment : </p>
        <br />
        <textarea id="comment" name="comment" rows={10} cols={40} />
      </div>
        <button className="btn" style={{width:'150px',textAlign:'center'}}>Submit</button>
    </div>
  );
};

export default Commentbox;
