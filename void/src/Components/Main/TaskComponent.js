import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => (props.isDragging ? "#96d4d7" : "#e4e3e3")};
  box-shadow: ${props =>
    props.isDragging ? " 4px 4px #83c8cc" : " 4px 4px #d8d8d8"};
`;

export default class Task extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editTask: false,
      input: `${this.props.task_name}`
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    const { editTask, input } = this.state;
    return (
      <Container
        className="task"
        key={this.props.task_id}
        {...this.props.provided.draggableProps}
        {...this.props.provided.dragHandleProps}
        ref={this.props.provided.innerRef}
        isDragging={this.props.snapshot.isDragging}
      >
        <div className="task-name-holder">
          {editTask ? (
            <div className="task-editor">
              <input
                onChange={e => {
                  this.toggle("input", e.target.value);
                }}
                placeholder={`${this.props.task_name}`}
              />
              <button
                onClick={() => {
                  this.props.updateTask(this.props.task_id, this.state.input);
                  this.toggle("editTask", !editTask);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <h1 className="task-name">{this.props.task_name}</h1>
          )}
        </div>
        <div className="task-buttons">
          {editTask ? (
            <div className="task-holder">
              <button onClick={() => this.toggle("editTask", !editTask)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="task-holder">
              <button onClick={() => this.toggle("editTask", true)}>
                Edit
              </button>
            </div>
          )}
          <i
            className="far fa-trash-alt"
            onClick={() => this.props.deleteTask(this.props.task_id)}
          ></i>
        </div>
      </Container>
    );
  }
}
