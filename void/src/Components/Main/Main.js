import React, { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Columns from "./ColumnComponent";
import Groups from "./Groups";
import "./Main.scss";
import { connect } from "react-redux";
import { setSidebar, setGroup } from "../../reducer";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: [],
      groupSelected: false,
      columns: [],
      sidebar: false,
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

    this.handleSelectionClick = this.handleSelectionClick.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.displayColumns = this.displayColumns.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.groupMembers = this.groupMembers.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.changeTitle("Login");
  }

  handleSelectionClick(group) {
    this.setState({ 
      groupSelected: true
    });
    this.getGroup(group);
    this.props.setGroup(group);
  }

  getGroup(group){
    axios.get(`/api/get_group/${group}`).then(group => {
      this.setState({
        group: group.data[0]
      })
    })
    this.displayColumns(group);
    this.groupMembers(group);
  }

  displayColumns(group) {
    axios.get(`/api/display_columns/${group}`).then(response => {
      this.setState({
        columns: response.data
      });
    })
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

  toggleSidebar(){
    this.setState((prevState) => {
      return {
        sidebar: !prevState.sidebar
      }
    })
    this.props.setSidebar(!this.props.sidebar);
  }

  groupMembers(group) {
    axios.get(`/api/group_members/${group}`).then(response => {
      this.setState({
        user1: response.data[0]['user1'],
        user2: response.data[0]['user2'],
        user3: response.data[0]['user3'],
        user4: response.data[0]['user4'],
        user5: response.data[0]['user5'],
        user6: response.data[0]['user6'],
        user7: response.data[0]['user7'],
        user8: response.data[0]['user8'],
        user9: response.data[0]['user9'],
        user10: response.data[0]['user10']
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

  render() {
    // console.log(this.state.group)
    const mappedColumns = this.state.columns;
    // let width;
    // if(this.state.group.length != []){
    //   width = '92%'
    // } else {
    //   width = '100%'
    // }
    return (
      <div className="board-container">
        {this.state.groupSelected ? <button className={this.state.sidebar ? 'move-right' : 'footer-toggle'} onClick={this.toggleSidebar}></button> : <></>}

        <footer className={this.state.sidebar ? 'show' : ''}>
          {this.state.sidebar && 
            <div className='sidebar-holder'>
              <Sidebar 
                handleSelectionClick={this.handleSelectionClick}
                toggleSidebar={this.toggleSidebar}
                groupMembers={this.groupMembers}
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
          }
        </footer>

        <div className='groups-columns'>
          {!this.state.groupSelected 
            ? (
                <div className="select-group">
                  <h1 className='main-h1'>Please select your group to get started!</h1>
                  <Groups handleSelectionClick={this.handleSelectionClick} />
                </div>
              ) 
            : (
                <div className="displayed-group">
                  <h1 className='main-h1'>{this.state.group.group_name}</h1>
                  <div className="mapped-columns">
                    {mappedColumns.map((allColumns, index) => <Columns key={index} displayColumns={this.displayColumns} allColumns={allColumns} editColumn={this.editColumn} deleteColumn={this.deleteColumn} group={this.state.group}/>)}
                  </div>
                  {/* <div className="new-column">
                    <p>Add New Column</p>
                    <i onClick={this.addColumn} className="fas fa-plus"></i>
                  </div> */}
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
};
const mapDispatchToProps = {
  setSidebar,
  setGroup
};
const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(Main);
