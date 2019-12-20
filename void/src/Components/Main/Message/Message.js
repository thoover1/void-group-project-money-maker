import React from "react";
import { IoIosText } from "react-icons/io";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message-area">
      <div className="message-circle">
        <IoIosText className="message-icon" />
      </div>
    </div>
  );
};

export default Message;
