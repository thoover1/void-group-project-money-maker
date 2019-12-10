import React, { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Columns from "./ColumnComponent";
import Groups from "./Groups";
import "./Main.scss";
import { connect } from "react-redux";
import axios from "axios";

class Main extends Component {
  // const Login = UseFetch(props.url)
  // const [board, setBoard] = useState([]);
  // const [columns, setColumns] = useState([]);

  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      groupSelected: false,
      group_id: null,
      board_name: "",
      columns: [],
      // used for filtering/adding to group //
      input: ""
    };

    this.displayBoard = this.displayBoard.bind(this);
    this.displayColumns = this.displayColumns.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectionClick = this.handleSelectionClick.bind(this);
    this.universalInput = this.universalInput.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.getGroups();
    this.displayBoard();
    this.displayColumns();
    this.props.changeTitle("Login");
  }

  async getGroups(user_id) {
    const res = await axios.get(`/api/get_groups`, { user_id });
    const { data } = await res;
    this.setState({
      groups: data
    });
  }

  async displayBoard(group_id) {
    const res = await axios.get(`/api/display_board/${group_id}`);
    const { data } = await res;
    this.setState({
      board_name: data
    });
  }

  async displayColumns() {
    const res = await axios.get(`/api/display_columns`);
    const { data } = await res;
    this.setState({
      columns: data
    });
  }

  addColumn(column_name, column_id) {
    axios.post(`/api/add_task`, { column_name, column_id }).then(res => {
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateColumn(
      this.state.columns.column_name,
      this.state.columns.column_id
    );
  }

  handleSelectionClick() {
    this.setState({ groupSelected: true });
  }

  universalInput(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  updateSearch = e => {
    this.setState({ input: e.target.value.substr(0, 20) });
  };

  render() {
    const mappedColumns = this.state.columns;
    const mappedGroups = this.state.groups.filter(groupie => {
      return (
        groupie.group_name
          .toLowerCase()
          .indexOf(this.state.input.toLowerCase()) !== -1
      );
    });
    console.log(1111, this.state.board_name);
    console.log(2222, this.state.board_name.group_name);
    console.log(3333, this.state.groups);
    return (
      <div className="board-container">
        <Sidebar />
        {!this.state.groupSelected ? (
          <div className="select-group">
            <h1>Please select your group to get started!</h1>
            <input
              type="text"
              placeholder="search for group"
              onChange={this.updateSearch}
            />
            {mappedGroups.map(groupie => {
              return (
                <Groups
                  groupie={groupie}
                  handleSelectionClick={this.handleSelectionClick}
                />
              );
            })}
          </div>
        ) : (
          <div className="displayed-group">
            <h1>{this.state.board_name.group_name}</h1>
            <div className="mapped-columns">
              {mappedColumns.map(allColumns => {
                return (
                  <Columns
                    allColumns={allColumns}
                    editColumn={this.editColumn}
                    deleteColumn={this.deleteColumn}
                  />
                );
              })}
            </div>
            <div className="new-column">
              <p>Add New Column</p>
              <i onClick={this.addColumn} class="fas fa-plus"></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const invokedConnect = connect(mapReduxStateToProps);

export default invokedConnect(Main);
