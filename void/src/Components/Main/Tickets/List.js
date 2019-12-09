import React from "react";
import TicketCard from "./TicketCard";
import "./List.scss";

const List = ({ title }) => {
  return (
    <div className="list" style={styles.container}>
      <h3>{title}</h3>
      <TicketCard text="ur a stupid idiot" />
      <TicketCard text="hello mom" />
      <TicketCard text="what is up dude" />
      <TicketCard text="f*ck u jklhhhkjhklkhjkhkhlkjhkjlhklhlkjhlk kjnkljhlkjhkjkhklj jkhgjkghj vjfhgghhjmgvbhjgf" />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 300,
    padding: 8
  }
};

export default List;
