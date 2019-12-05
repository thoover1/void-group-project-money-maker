import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };

    this.displayBoard = this.displayBoard.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.displayBoard();
    // this.props.changeTitle("Login");
  }

  // display
  async displayBoard() {
    const res = await axios.get(`/api/display_board`);
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

  moveTask(task_id, column_id) {
    axios.post(`/api/move_task`, { task_id, column_id }).then(res => {
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

  render() {
    return <div className="board-container"></div>;
  }
}
