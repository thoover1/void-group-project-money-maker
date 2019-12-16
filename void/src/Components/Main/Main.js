import React, { Component } from "react";
import Columns from "./ColumnComponent";
import Sidebar from "../Main/Sidebar/Sidebar";
import "./Main.scss";
import axios from "axios";

export default class Main extends Component {
  // const Login = UseFetch(props.url)
  // const [board, setBoard] = useState([]);
  // const [columns, setColumns] = useState([]);

  constructor(props) {
    super(props);

    this.state = {
      board: [],
      columns: []
    };

    this.displayBoard = this.displayBoard.bind(this);
    this.displayColumns = this.displayColumns.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.displayBoard();
    this.displayColumns();
    this.props.changeTitle("Login");
  }

  async displayBoard() {
    const res = await axios.get(`/api/display_board`);
    const { data } = await res;
    this.setState({
      board: data
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

  render() {
    const mappedColumns = this.state.columns;
    return (
      <div className="board-container">
        <Sidebar />
        {/* <Message /> */}
        <h1>{this.state.board.group_name}</h1>
        <div className="mapped-columns">
          {mappedColumns.map(allColumns => {
            return (
              <Columns
                allColumns={allColumns}
                addColumn={this.addColumn}
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
    );
  }
}
