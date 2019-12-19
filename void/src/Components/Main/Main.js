import React, { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Columns from "./ColumnComponent";
import Groups from "./Groups";
import Message from "./Message/Message";
import { DragDropContext } from "react-beautiful-dnd";
import "./Main.scss";
import { connect } from "react-redux";
import { setSidebar, setGroup, getGroup } from "../../reducer";
import { Link } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [],
      groupSelected: false,
      columns: [],
      tasks: [],
      sidebar: false,
      addNChange: false,
      addColumn: false,
      newColumn: "",
      changeName: false,
      newName: "",
      user1: "",
      user2: "",
      user3: "",
      user4: "",
      user5: "",
      user6: "",
      user7: "",
      user8: "",
      user9: "",
      user10: ""
    };
    this.displayTasks = this.displayTasks.bind(this);
    this.handleSelectionClick = this.handleSelectionClick.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.displayColumns = this.displayColumns.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.groupMembers = this.groupMembers.bind(this);
    this.switchColumns = this.switchColumns.bind(this);
    this.toggleGroupSelected = this.toggleGroupSelected.bind(this);
    this.changeGroupName = this.changeGroupName.bind(this);
  }

  componentDidMount() {
    this.props.changeTitle("Login");
    this.props.setSidebar(false);
  }
  handleSelectionClick(group, group_name) {
    this.setState({
      groupSelected: true
    });
    this.getGroup(group);
    this.props.setGroup(group);
    this.props.getGroup(group_name);
  }
  getGroup(group) {
    axios.get(`/api/get_group/${group}`).then(group => {
      this.setState({
        group: group.data[0]
      });
    });
    this.displayColumns(group);
    this.displayTasks(group);
    this.groupMembers(group);
  }
  displayColumns(group) {
    axios.get(`/api/display_columns/${group}`).then(response => {
      this.setState({
        columns: response.data
      });
    });
  }

  addColumn() {
    axios
      .post("/api/add_column", {
        column_name: this.state.newColumn,
        group_id: this.props.group
      })
      .then(() => {
        this.displayColumns(this.props.group);
      });
  }
  editColumn(column_id, column_name) {
    axios.put(`/api/update_column/${column_id}`, { column_name: column_name, group_id: this.props.group }).then(() => {
      this.displayColumns(this.props.group);
    });
  }
  deleteColumn(column_id) {
    axios
      .delete(`/api/delete_column/${column_id}`, { group_id: this.props.group })
      .then(() => {
        this.displayColumns(this.props.group);
      });
  }

  toggleSidebar() {
    this.setState(prevState => {
      return {
        sidebar: !prevState.sidebar
      };
    });
    this.props.setSidebar(!this.props.sidebar);
  }
  toggleGroupSelected(val) {
    this.setState({
      groupSelected: val
    });
  }

  groupMembers(group) {
    axios.get(`/api/group_members/${group}`).then(response => {
      this.setState({
        user1: response.data[0]["user1"],
        user2: response.data[0]["user2"],
        user3: response.data[0]["user3"],
        user4: response.data[0]["user4"],
        user5: response.data[0]["user5"],
        user6: response.data[0]["user6"],
        user7: response.data[0]["user7"],
        user8: response.data[0]["user8"],
        user9: response.data[0]["user9"],
        user10: response.data[0]["user10"]
      });
    });
  }

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
    this.switchColumns(newColumn, IDofTask);
  };

  switchColumns(newColumn, IDofTask) {
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
  changeGroupName() {
    axios
      .put("/api/update_group_name", {
        group_name: this.state.newName,
        group_id: this.props.group
      })
      .then(() => {
        this.handleSelectionClick(this.props.group);
      });
  }
  render() {
    const mappedColumns = this.state.columns;
    let width;
    if (this.props.sidebar) {
      width = "92%";
    } else {
      width = "100%";
    }
    return (
      <div className="board-container">
        {this.state.groupSelected ? (
          <button
            className={this.state.sidebar ? "move-right" : "footer-toggle"}
            onClick={this.toggleSidebar}
          ></button>
        ) : (
          <></>
        )}

        <footer className={this.state.sidebar ? "show" : ""}>
          {this.state.sidebar && (
            <div className="sidebar-holder">
              <Sidebar
                handleSelectionClick={this.handleSelectionClick}
                toggleSidebar={this.toggleSidebar}
                groupMembers={this.groupMembers}
                toggleGroupSelected={this.toggleGroupSelected}
                user1={this.state.user1}
                user2={this.state.user2}
                user3={this.state.user3}
                user4={this.state.user4}
                user5={this.state.user5}
                user6={this.state.user6}
                user7={this.state.user7}
                user8={this.state.user8}
                user9={this.state.user9}
                user10={this.state.user10}
              />
            </div>
          )}
        </footer>

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
              <i
                onClick={() =>
                  this.setState({
                    addNChange: !this.state.addNChange,
                    changeName: false,
                    addColumn: false
                  })
                }
                className="fas fa-plus add-column"
              ></i>
              {this.state.addNChange && (
                <div className="edit-fields">
                  {this.state.changeName ? (
                    <div className="renamer">
                      <input
                        onChange={e =>
                          this.setState({ newName: e.target.value })
                        }
                        placeholder="New group name"
                      />
                      <button
                        onClick={() => {
                          this.changeGroupName();
                          this.setState({ addNChange: false });
                        }}
                      >
                        Change
                      </button>
                      <button
                        onClick={() =>
                          this.setState({ changeName: !this.state.changeName })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="renamer">
                      <button
                        onClick={() =>
                          this.setState({
                            changeName: !this.state.changeName,
                            addColumn: false
                          })
                        }
                      >
                        Change Group Name
                      </button>
                    </div>
                  )}
                  {this.state.addColumn ? (
                    <div className="adder">
                      <input
                        onChange={e =>
                          this.setState({ newColumn: e.target.value })
                        }
                      />
                      <button
                        onClick={() => {
                          this.addColumn();
                          this.setState({ addNChange: false });
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() =>
                          this.setState({ addColumn: !this.state.addColumn })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="adder">
                      <button
                        onClick={() =>
                          this.setState({
                            addColumn: !this.state.addColumn,
                            changeName: false
                          })
                        }
                      >
                        Add Column
                      </button>
                    </div>
                  )}
                </div>
              )}
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="mapped-columns">
                  {mappedColumns.map((allColumns, index) => (
                    <Columns
                      key={index}
                      displayTasks={this.displayTasks}
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

              <div>
                <Link
                  to={`/chat?name=${
                    this.props.user.username
                  }&room=${this.props.group_name.toLowerCase()}`}
                >
                  <Message type="submit" />
                </Link>
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
const mapDispatchToProps = {
  setSidebar,
  setGroup,
  getGroup
};
const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(Main);
