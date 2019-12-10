import React, { Component } from "react";
import Tasks from "./TaskComponent";
import axios from "axios";

export default class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      filter: []
    };

    this.displayTasks = this.displayTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searching = this.searching.bind(this);
  }

  componentDidMount() {
    this.displayTasks();
  }

  async displayTasks() {
    const res = await axios.get(`/api/display_tasks`);
    const { data } = await res;
    this.setState({
      tasks: data
    });
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
    this.updateTask(this.state.tasks.task_name, this.state.tasks.task_id);
  }

  searching = e => {
    this.setState({ filter: e.target.value.substr(0, 20) });
  };

  render() {
    const mappedTasks = this.state.tasks.filter(allTasks => {
      return (
        allTasks.task_name
          .toLowerCase()
          .indexOf(this.state.filter.toLowerCase()) !== -1
      );
    });
    return (
      <div className="column-container">
        <input
          type="text"
          placeholder="search for tasks"
          onChange={this.searching}
        />
        <div className="column-header">
          <h3>{this.props.allColumns.column_name}</h3>
          <i class="far fa-edit"></i>
          <i onClick={this.addTask} class="fas fa-plus"></i>
        </div>
        <div className="mapped-tasks">
          {mappedTasks.map(allTasks => {
            return (
              <Tasks
                allTasks={allTasks}
                updateTask={this.updateTask}
                deleteTask={this.deleteTask}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
