import React, { Component } from "react";

export default class MappedColumn extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   ticket: {
    //     ticketId: this.props.newColumnTicket.ticketId,
    //     ticketTitle: this.props.newColumnTicket.ticketTitle,
    //     scale: this.props.newColumnTicket.scale,
    //     comments: this.props.newColumnTicket.comments
    //   }
    // };
  }

  render() {
    return (
      <div
        className="ticket-container"
        // edit the ID since it's automatically created in db
        id={this.props.newColumnTicket.ticketId}
      >
        <h4>{this.props.newColumnTicket.ticketTitle}</h4>
        <h4>{this.props.newColumnTicket.scale}</h4>
        <h6>{this.props.newColumnTicket.comments}</h6>
      </div>
    );
  }
}
