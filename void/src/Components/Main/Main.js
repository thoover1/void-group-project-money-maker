import React, { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Columns from "./ColumnComponent";
import Groups from "./Groups";
import { DragDropContext } from "react-beautiful-dnd";
import "./Main.scss";
import { connect } from "react-redux";
import axios from "axios";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [],
      groupSelected: false,
      columns: [],
      tasks: []
    };
    this.displayTasks = this.displayTasks.bind(this);
    this.handleSelectionClick = this.handleSelectionClick.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.displayColumns = this.displayColumns.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.swtichColumns = this.swtichColumns.bind(this);
  }
  componentDidMount() {
    this.props.changeTitle("Login");
  }
  handleSelectionClick(group) {
    this.setState({
      groupSelected: true
    });
    this.getGroup(group);
  }
  getGroup(group) {
    axios.get(`/api/get_group/${group}`).then(group => {
      this.setState({
        group: group.data[0]
      });
    });
    this.displayColumns(group);
    this.displayTasks(group);
  }
  displayColumns(group) {
    axios.get(`/api/display_columns/${group}`).then(response => {
      this.setState({
        columns: response.data
      });
    });
  }
  addColumn(column_name, group_id) {
    axios.post(`/api/add_task`, { column_name, group_id }).then(res => {
      this.setState({
        columns: res.data
      });
    });
  }
  editColumn(column_id, column_name) {
    axios.put(`/api/update_task/${column_id}`, { column_name }).then(res => {
      this.setState({
        columns: res.data
      });
    });
  }
  deleteColumn(column_id) {
    axios.delete(`/api/delete_task/${column_id}/`).then(res => {
      this.setState({
        columns: res.data
      });
    });
  }
  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.updateColumn(
  //     this.state.columns.column_name,
  //     this.state.columns.column_id
  //   );
  // }
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    // not a valid destination to drop -- returns to baseline
    if (!destination) {
      return;
    }
    // if picked up and put back where it was before --return baseline
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let IDofTask = draggableId;
    let newColumn = destination.droppableId;
    this.swtichColumns(newColumn, IDofTask);
  };
  swtichColumns(newColumn, IDofTask) {
    axios
      .put(`/api/switch_columns/${IDofTask}`, {
        column_id: newColumn,
        group_id: this.state.group.group_id
      })
      .then(this.displayTasks(this.state.group.group_id));
    this.displayTasks(this.state.group.group_id);
  }
  displayTasks(group) {
    axios.get(`/api/display_tasks/${group}`).then(response => {
      this.setState({
        tasks: response.data
      });
    });
  }
  render() {
    const mappedColumns = this.state.columns;
    let width;
    if (this.state.group.length != []) {
      width = "92%";
    } else {
      width = "100%";
    }
    return (
      <div className="board-container">
        {this.state.group.length != [] ? <Sidebar /> : <></>}
        <div className="groups-columns" style={{ width: width }}>
          {!this.state.groupSelected ? (
            <div className="select-group">
              <h1 className="main-h1">
                Please select your group to get started!
              </h1>
              <Groups handleSelectionClick={this.handleSelectionClick} />
            </div>
          ) : (
            <div className="displayed-group">
              <h1 className="main-h1">{this.state.group.group_name}</h1>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="mapped-columns">
                  {mappedColumns.map(allColumns => (
                    <Columns
                      displayColumns={this.displayColumns}
                      allColumns={allColumns}
                      editColumn={this.editColumn}
                      deleteColumn={this.deleteColumn}
                      group={this.state.group}
                      tasks={this.state.tasks}
                    />
                  ))}
                </div>
              </DragDropContext>
              <div className="new-column">
                <p>Add New Column</p>
                <i onClick={this.addColumn} className="fas fa-plus"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapReduxStateToProps(reduxState) {
  return reduxState;
}
const invokedConnect = connect(mapReduxStateToProps);
export default invokedConnect(Main);
