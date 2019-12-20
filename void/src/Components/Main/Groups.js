import React from "react";
import axios from "axios";
import "./Groups.scss";

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupNames: [],
      input: "",
      createField: "",
      createGroup: false
    };
    this.universalInput = this.universalInput.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.toggleGroup = this.toggleGroup.bind(this);
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups() {
    axios.get("/api/get_groups").then(response => {
      let array = [];
      let names = [];
      for (var i = 0; i < response.data.length; i++) {
        array.push([
          response.data[i]["group_id"],
          response.data[i]["group_name"]
        ]);
        names.push(response.data[i]["group_name"]);
      }
      this.setState({
        groups: array,
        groupNames: names
      });
    });
  }

  createGroup(group_name) {
    // this.setState({
    //   groups: [],
    //   groupNames: []
    // });
    axios
      .post(`/api/create_group`, { group_name: group_name })
      .then(res => {
        this.setState({
          tasks: res.data
        });
        this.getGroups();
      })
      .catch(err => console.log(err));
  }

  universalInput(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  toggleGroup() {
    this.setState(prevState => {
      return {
        createGroup: !prevState.createGroup
      };
    });
  }

  render() {
    const filteredGroups = this.state.groups
      .filter(group =>
        group[1].toLowerCase().startsWith(this.state.input.toLowerCase())
      )
      .sort((a, b) => a - b);
    const sorted = this.state.groups.sort(function(a, b) {
      var nameA = a[1].toLowerCase();
      var nameB = b[1].toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    const toMap = this.state.input ? filteredGroups : sorted;
    let mappedGroups = toMap.map((group, index) => {
      return (
        <div key={index} className="group">
          <button
            className="group-button"
            onClick={() => {
              this.props.handleSelectionClick(group[0], group[1]);
            }}
          >
            <h2>{group[1]}</h2>
          </button>
        </div>
      );
    });

    return (
      <div className="groups-holder">
        <input
          className="group-search"
          type="text"
          placeholder="Group Search"
          onChange={e => this.universalInput("input", e.target.value)}
        />
        {this.state.createGroup ? (
          <div className="create-group-container">
            <input
              className="create-group"
              type="text"
              placeholder="Create Group"
              onChange={e => this.universalInput("createField", e.target.value)}
            />
            <button
              className="create-group-button"
              onClick={() => {
                this.createGroup(this.state.createField);
                this.universalInput("createGroup", false);
              }}
            >
              Create
            </button>
          </div>
        ) : (
          <div className="create-group-container"></div>
        )}
        <div className="groups">
          {mappedGroups}
          <button className="plus-button" onClick={this.toggleGroup} />
        </div>
      </div>
    );
  }
}
