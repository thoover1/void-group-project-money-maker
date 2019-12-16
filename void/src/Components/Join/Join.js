import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../reducer";
import "./Join.scss";

function Join(props) {
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Void-Chat (BETA)</h1>
        <div>
          <input
            placeholder="Group"
            className="joinInput mt-20"
            type="text"
            onChange={e => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={e => (!room ? e.preventDefault() : null)}
          to={`/chat?name=${props.user.username}&room=${room.toLowerCase(room)}`}
        >
          <button className="button mt-20" type="submit">
            Start Chatting!
          </button>
        </Link>
      </div>
    </div>
  );
}


function mapReduxStateToProps(reduxState) {
    return reduxState;
  }
  
  const mapDispatchToProps = {
    setUser
  };
  
  export default connect(mapReduxStateToProps, mapDispatchToProps)(Join);