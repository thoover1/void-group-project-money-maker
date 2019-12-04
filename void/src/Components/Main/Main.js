import React, { Component } from "react";
import MappedBoard from "./MappedBoard";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      column: {
        // columnId: null,
        columnTitle: "",
        columnTickets: []
      },
      projectName: ""
    };
  }

  // add componentDidMount() {}

  // add handle change
  // add handlesubmit

  // add axios requests

  render() {
    const mappedBoard = this.state.board;
    return (
      <div className="board-container">
        <h1>{this.state.projectName}</h1>
        <div className="mapped-board">
          {mappedBoard.map(newBoard => {
            return (
              <MappedBoard
                newboard={newBoard}
                // will insert functions to endpoints to add/edit/delete columns
              />
            );
          })}
        </div>
      </div>
    );
  }
}
