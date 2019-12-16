import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import "./ColumnComponent.scss";
export default class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      taskEdit: '',
      editTask: false
    };

    // this.addTask = this.addTask.bind(this);
    // this.updateTask = this.updateTask.bind(this);
    // this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searching = this.searching.bind(this);
  }

  // addTask(task_name, column_id, group_id) {
  //   axios.post(`/api/add_task/${task_name}/${group_id}`, { task_name, column_id, group_id }).then(res => {
  //     this.setState({
  //       tasks: res.data
  //     });
  //   }).catch(err => console.log(err))
  // }

  // updateTask(task_id) {
  //   axios.put(`/api/update_task/${task_id}`, { task_name: this.state.taskEdit, group_id:this.props.group_id }).then(res => {
  //     this.setState({
  //       tasks: res.data
  //     });
  //     this.displayTasks();
  //   }).catch(err => console.log(err))
  // }
  // deleteTask(task_id) {
  //   let { group_id } = this.props.group
  //   axios.delete(`/api/delete_task/${task_id}/${group_id}`).then(res => {
  //     this.setState({
  //       tasks: res.data
  //     });
  //     console.log(333, 'hello')
  //   }).catch(err => console.log(err))
  // }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateTask(this.props.tasks.task_name, this.props.tasks.task_id, this.props.group);
  }
  searching = e => {
    this.setState({ filterer: e.target.value.substr(0, 20) });
  };

  toggle(prop, val) {
    this.setState({
      [prop]: val
    })
  };
  render() {
    let mappedTasks;
    let task = [];
    let { editTask, taskEdit } = this.state;
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
                  <div className="task-buttons">
                  {editTask 
                  ? <div className='task-editor'>
                    <input onChange={(e) => {this.toggle('taskEdit', e.target.value)}} placeholder='Edit Task' />
                    <span>
                      <button onClick={() => this.toggle(editTask, false)}>Cancel</button>
                      <button onClick={() => {taskEdit ? this.props.updateTask(allTasks.task_id, this.state.taskEdit) : this.toggle('editTask', false);}}>Save</button>
                    </span>
                    </div>
                   : <div className='task-holder'>
                      <button onClick={() => this.toggle('editTask', true)}>Edit</button>
                    </div>
                }
                    <i
                      className="far fa-trash-alt"
                      onClick={() => this.props.deleteTask(allTasks.task_id)} 
                    ></i>
                  </div>
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
          <i onClick={() => this.props.addTask()} className="fas fa-plus">
            Add Task
          </i>
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
