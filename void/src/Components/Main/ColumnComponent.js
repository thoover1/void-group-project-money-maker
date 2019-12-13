import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import "./ColumnComponent.scss";
export default class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks
    };

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searching = this.searching.bind(this);
  }

  addTask(task_name, column_id) {
    axios.post(`/api/add_task`, { task_name, column_id }).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }
  updateTask(task_id, task_name) {
    axios.put(`/api/update_task/${task_id}`, { task_name }).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }
  deleteTask(task_id) {
    axios.delete(`/api/delete_task/${task_id}/`).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.updateTask(this.props.tasks.task_name, this.props.tasks.task_id);
  }
  searching = e => {
    this.setState({ filterer: e.target.value.substr(0, 20) });
  };
  render() {
    let mappedTasks;
    let task = [];
    for (var i = 0; i < this.props.tasks.length; i++) {
      if (
        this.props.tasks[i]["column_id"] === this.props.allColumns.column_id
      ) {
        task.push(this.props.tasks[i]);
        mappedTasks = task.map((allTasks, index) => {
          return (
            <Draggable
              draggableId={allTasks.task_id.toString()}
              key={allTasks.task_id}
              index={index}
            >
              {provided => (
                <div
                  className="task"
                  key={allTasks.task_id}
                  // index={index}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <h1 className="task-name">{allTasks.task_name}</h1>
                </div>
              )}
            </Draggable>
          );
        });
      }
    }
    return (
      <div className="column-container">
        <div className="column-header">
          <h3>{this.props.allColumns.column_name}</h3>
          <i className="far fa-edit"></i>
          <i onClick={this.addTask} className="fas fa-plus"></i>
        </div>
        <Droppable droppableId={this.props.allColumns.column_id.toString()}>
          {provided => (
            <div
              className="mapped-tasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {mappedTasks}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
