import React from "react";
import axios from "axios";
import './Groups.scss';

export default class Groups extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      groups: [],
      groupNames: [],
      input: ''
    }
    this.universalInput = this.universalInput.bind(this);
  }

  componentDidMount(){
    axios.get("/api/get_groups").then(response => {
      let array = [];
      let names = [];
      for(var i = 0; i < response.data.length; i++){
        array.push([response.data[i]['group_id'], response.data[i]['group_name']]);
        names.push(response.data[i]['group_name']);
      }
      this.setState({
        groups: array,
        groupNames: names
      })
    })
  }

  universalInput(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render(){
    const filteredGroups = this.state.groups.filter(group => group[1].toLowerCase().startsWith(this.state.input.toLowerCase()));
    let mappedGroups;
    {this.state.input ?
      mappedGroups = filteredGroups.map(group => {
        return (
          <div key={group[0]} className='group'>
            <button className='group-button' onClick={() => {this.props.handleSelectionClick(group[0])}}>
              <h2>{group[1]}</h2>
            </button>
          </div>
        )
      })
      :
      mappedGroups = this.state.groups.map(group => {
      return (
        <div key={group[0]} className='group'>
          <button className='group-button' onClick={() => {this.props.handleSelectionClick(group[0])}}>
            <h2>{group[1]}</h2>
          </button>
        </div>
      )
    })}
  
    return (
      <div className='groups-holder'>
        <input className='group-search' type="text" placeholder="Group Search" onChange={(e) => this.universalInput('input', e.target.value)} />
        <div className='groups'>
          {mappedGroups}
        </div>
      </div>
    );
  }
}