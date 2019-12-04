import React, { Component } from "react";
import MappedColumn from "./MappedColumn";

export default class MappedBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: {
        // columnId: this.props.newBoard.columnId,
        // columnTitle: this.props.newBoard.columnTitle,
        columnTickets: this.props.newBoard.column.columnTickets
      },
      ticket: {
        // ticketId: null,
        ticketTitle: "",
        scale: 0,
        comments: ""
      }
    };
  }

  // add componentDidMount() {}

  // add an onClick event to expand specific ticket into a modal for a more detailed view
  // add handle change
  // add handlesubmit

  // add axios requests

  render() {
    const mappedColumnTickets = this.state.column.columnTickets;
    return (
      <div className="column-container">
        <h3>{this.props.newBoard.column.columnTitle}</h3>
        <div
          className="mapped-column"
          // edit the ID since it's automatically created in db
          id={this.props.newBoard.column.columnId}
        >
          {mappedColumnTickets.map(newColumnTicket => {
            return (
              <MappedColumn
                newColumnTicket={newColumnTicket}
                // will insert functions to endpoints to add/edit/delete tickets
                // unless these need to be passed down as props from Main.js also...
              />
            );
          })}
        </div>
      </div>
    );
  }
}
