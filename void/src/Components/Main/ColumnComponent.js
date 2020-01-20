import React, { PureComponent } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import axios from "axios";
import "./ColumnComponent.scss";
import TaskComponent from "./TaskComponent";
import { connect } from "react-redux";

const Tasker = styled.div`
  background-color: ${props =>
    props.isDraggingOver
      ? // "#2460ad"
        "white"
      : "white"};
`;

class ColumnComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      taskEdit: "",
      editTask: false,
      addTask: false,
      taskField: "",
      dots: false,
      nameChange: false,
      newName: ""
    };

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searching = this.searching.bind(this);
  }

  addTask(task_name, column_id, group_id) {
    axios
      .post(`/api/add_task`, {
        task_name: task_name,
        column_id: column_id,
        group_id: group_id
      })
      .then(res => {
        this.setState({
          tasks: res.data
        });
        this.props.displayTasks(this.props.group);
      })
      .catch(err => console.log(err));
  }

  updateTask(task_id, task_name) {
    axios
      .put(`/api/update_task/${task_id}`, {
        task_name: task_name,
        group_id: this.props.group
      })
      .then(res => {
        this.setState({
          tasks: res.data
        });
        this.props.displayTasks(this.props.group);
      })
      .catch(err => console.log(err));
  }

  deleteTask(task_id) {
    axios
      .delete(`/api/delete_task/${task_id}/${this.props.group}`)
      .then(res => {
        this.setState({
          tasks: res.data
        });
        this.props.displayTasks(this.props.group);
      })
      .catch(err => console.log(err));
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateTask(
      this.props.tasks.task_name,
      this.props.tasks.task_id,
      this.props.group
    );
  }

  searching = e => {
    this.setState({ filterer: e.target.value.substr(0, 20) });
  };

  render() {
    let mappedTasks;
    let task = [];
    // let { editTask, taskEdit } = this.state;
    for (var i = 0; i < this.props.tasks.length; i++) {
      if (
        this.props.tasks[i]["column_id"] === this.props.allColumns.column_id
      ) {
        task.push(this.props.tasks[i]);
        mappedTasks = task.map((allTasks, index) => {
          console.log(mappedTasks);
          return (
            <Draggable
              draggableId={allTasks.task_id.toString()}
              key={allTasks.task_id}
              index={index}
            >
              {(provided, snapshot) => (
                <TaskComponent
                  provided={provided}
                  snapshot={snapshot}
                  // isDragging={snapshot.isDragging}
                  task_id={allTasks.task_id}
                  task_name={allTasks.task_name}
                  deleteTask={this.deleteTask}
                  updateTask={this.updateTask}
                />
              )}
            </Draggable>
          );
        });
      }
    }
    return (
      <div className="column-container">
        <div className="column-header">
          {this.state.nameChange ? (
            <input
              className="name"
              onChange={e => {
                this.handleChange("newName", e.target.value);
              }}
              placeholder={`${this.props.allColumns.column_name}`}
            />
          ) : (
            <h3 className="name">{this.props.allColumns.column_name}</h3>
          )}
          {this.state.dots && (
            <div className="column-dots">
              {this.state.nameChange ? (
                <button
                  onClick={() => {
                    this.props.editColumn(
                      this.props.allColumns.column_id,
                      this.state.newName
                    );
                    this.setState({ nameChange: false })
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.props.deleteColumn(this.props.allColumns.column_id);
                    this.setState({ dots: false });
                  }}
                >
                  Delete Column
                </button>
              )}
              <button
                onClick={() =>
                  this.setState({ nameChange: !this.state.nameChange })
                }
              >
                {this.state.nameChange ? "Cancel" : "Change Name"}
              </button>
            </div>
          )}
          <span className="dots-plus">
            <i
              onClick={() => this.setState({ dots: !this.state.dots })}
              className="fas fa-ellipsis-h"
            ></i>
            <i
              onClick={() => this.setState({ addTask: true })}
              className="fas fa-plus"
            ></i>
          </span>
        </div>
        <div className="map-task-holder">
          {this.state.addTask && (
            <span className="add-task">
              <input
                onChange={e => this.handleChange("taskField", e.target.value)}
                placeholder="New task"
              />
              <button
                onClick={() => {
                  this.addTask(
                    this.state.taskField,
                    this.props.allColumns.column_id,
                    this.props.group
                  );
                  this.setState({ addTask: false });
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  this.setState({ addTask: false });
                }}
              >
                Cancel
              </button>
            </span>
          )}
          <Droppable droppableId={this.props.allColumns.column_id.toString()}>
            {(provided, snapshot) => (
              <Tasker
                className="mapped-tasks"
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {mappedTasks}
                {provided.placeholder}
              </Tasker>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}
const invokedConnect = connect(mapReduxStateToProps);

export default invokedConnect(ColumnComponent);
