import React from "react";
import { IoIosText } from "react-icons/io";
import Badge from "@material-ui/core/Badge";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message-area"> 
        <div className="message-circle">
        <Badge color="secondary" badgeContent="4" >
            <IoIosText className="message-icon" />
        </Badge>
        </div>
    </div>
  );
};

export default Message;
