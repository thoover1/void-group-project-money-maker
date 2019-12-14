import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { connect } from "react-redux";
import "./Sidebar.scss";
import axios from "axios";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      groups: [],
      groupNames: [],
      img: '',
      spot: '',
      input: '',
      imgUser: '',
      more: false,
      search: false,
      remove: false,
      groupChange: false,
      user1: this.props.user1,
      user2: this.props.user2,
      user3: this.props.user3,
      user4: this.props.user4,
      user5: this.props.user5,
      user6: this.props.user6,
      user7: this.props.user7,
      user8: this.props.user8,
      user9: this.props.user9,
      user10: this.props.user10,
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      img6: '',
      img7: '',
      img8: '',
      img9: '',
      img10: ''
    };
    this.getMember = this.getMember.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.universalInput = this.universalInput.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.toggleGroup = this.toggleGroup.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.toggleRemove = this.toggleRemove.bind(this);
  }

  componentDidMount(){
    this.getMember('img1', this.state.user1);
    this.getMember('img2', this.state.user2);
    this.getMember('img3', this.state.user3);
    this.getMember('img4', this.state.user4);
    this.getMember('img5', this.state.user5);
    this.getMember('img6', this.state.user6);
    this.getMember('img7', this.state.user7);
    this.getMember('img8', this.state.user8);
    this.getMember('img9', this.state.user9);
    this.getMember('img10', this.state.user10);
    this.getAllUsers();
  }

  getMember(prop, param){
    if(param !== null){
      axios.get(`/api/group_member/${param}`).then(response => {
        this.setState({
          [prop]: response.data[0].image,
          search: false
        })
      })
    }
  }

  addUser (user, user_id) {
    axios.post(`/api/update_user/${user}`, {user_id: user_id, group_id: this.props.group}).then(res => {
      this.setState({
        user: user_id,
        search: false
      })
      this.getMember(this.state.img, user_id);
      this.props.groupMembers(this.props.group);
      this.props.toggleSidebar();
    });
  }

  removeUser (user, user_id) {
    axios.post(`/api/update_user/${user}`, {user_id: user_id, group_id: this.props.group}).then(res => {
      this.setState({
        user: user_id,
        search: false
      })
      // this.getMember(this.state.img, user_id);
      this.props.groupMembers(this.props.group);
      this.props.toggleSidebar();
    });
  }

  getAllUsers(){
    axios.get('/api/get_all_users').then(response => {
      this.setState({
        users: response.data
      })
    })
  }

  universalInput(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  getGroups(){
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

  toggleGroup(){
    this.setState((prevState) => {
      return {
        groupChange: !prevState.groupChange
      }
    })
  }
  toggleSearch(){
    this.setState((prevState) => {
      return {
        search: !prevState.search
      }
    })
  }
  toggleMore(){
    this.setState((prevState) => {
      return {
        more: !prevState.more
      }
    })
  }
  toggleRemove(){
    this.setState((prevState) => {
      return {
        remove: !prevState.remove
      }
    })
  }

  render(){
    const {users, input, search, spot, groupChange, more, remove, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10} = this.state;
    
    const mappedGroups = this.state.groups.map(group => {
      return (
        <div key={group[0]} className='group'>
          <button className='group-button' onClick={() => {this.props.handleSelectionClick(group[0]); this.toggleGroup(); this.props.toggleSidebar();}}>
            <h2>{group[1]}</h2>
          </button>
        </div>
      )
    })
    
    const filteredUsers = users.filter(user => user.username.startsWith(input.toLowerCase()));
    const mappedUsers = filteredUsers.map(user => 
      <div key={user.user_id} className='user'>
        <h1 className='username'>{user.username}</h1>
        <button className='add-button' onClick={() => {this.addUser(spot, user.user_id);}}>Add</button>
      </div>
    )

    return (
        <div className="sidebar-background">
          <div className="inner">
            <button className='ham-butt' onClick={() => {this.getGroups(); this.toggleGroup(); this.setState({more: false, search: false, remove: false})}}>
              <FaBars className="ham-menu" />
            </button>
            {groupChange 
              ? <div className='group-selector'>
                  <h1 className='switch-groups'>Switch Groups</h1>
                  <div className='mapped-groups'>
                    {mappedGroups}
                  </div>
                </div>
              : <></>
            }
            <span className="user-around">
                {user1 
                  ? (remove ? <button onClick={() => {this.removeUser('user1', null);}} className='minus-button'></button> : <img className="user-avi" src={img1} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user1', img: 'img1', foundUser: 1})}}></button>
                }
                {user2 
                  ? (remove ? <button onClick={() => {this.removeUser('user2', null);}} className='minus-button'></button> : <img className="user-avi" src={img2} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user2', img: 'img2', foundUser: 2})}}></button>
                }
                {user3 
                  ? (remove ? <button onClick={() => {this.removeUser('user3', null);}} className='minus-button'></button> : <img className="user-avi" src={img3} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user3', img: 'img3', foundUser: 3})}}></button>
                }
                {user4 
                  ? (remove ? <button onClick={() => {this.removeUser('user4', null);}} className='minus-button'></button> : <img className="user-avi" src={img4} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user4', img: 'img4', foundUser: 4})}}></button>
                }
                {user5 
                  ? (remove ? <button onClick={() => {this.removeUser('user5', null);}} className='minus-button'></button> : <img className="user-avi" src={img5} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user5', img: 'img5', foundUser: 5})}}></button>
                }
                {user6 
                  ? (remove ? <button onClick={() => {this.removeUser('user6', null);}} className='minus-button'></button> : <img className="user-avi" src={img6} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user6', img: 'img6', foundUser: 6})}}></button>
                }
                {user7 
                  ? (remove ? <button onClick={() => {this.removeUser('user7', null);}} className='minus-button'></button> : <img className="user-avi" src={img7} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user7', img: 'img7', foundUser: 7})}}></button>
                }
                {user8 
                  ? (remove ? <button onClick={() => {this.removeUser('user8', null);}} className='minus-button'></button> : <img className="user-avi" src={img8} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user8', img: 'img8', foundUser: 8})}}></button>
                }
                {user9 
                  ? (remove ? <button onClick={() => {this.removeUser('user9', null);}} className='minus-button'></button> : <img className="user-avi" src={img9} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user9', img: 'img9', foundUser: 9})}}></button>
                }
                {user10 
                  ? (remove ? <button onClick={() => {this.removeUser('user10', null);}} className='minus-button'></button> : <img className="user-avi" src={img10} alt='user profile pic' />)
                  : <button className='plus-button' onClick={() => {this.toggleSearch(); this.setState({groupChange: false, more: false, remove: false, spot: 'user10', img: 'img10', foundUser: 10})}}></button>
                }
            </span>
            <div className='something'>
              <button className='more-button' onClick={() => {this.toggleMore(); this.setState({search: false, groupChange: false, remove: false})}} >
                <MdMoreHoriz className="three-dots"/>
              </button>
              {more
                ? <div className='more-screen'><button className='remove-user' onClick={() => this.toggleRemove()}>{remove ? 'Cancel' : 'Delete Users'}</button></div>
                : <></>
              }
            </div>
            {search 
              ? <div className='search-box'>
                  <input className='search-input' onChange={(e) => this.universalInput('input', e.target.value)} placeholder='User Search' />
                  {input === '' ? <div className='map-users'></div> : <div className='map-users'>{mappedUsers}</div>}
                </div>
              : <></>
            }
          </div>
        </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
};
const invokedConnect = connect(mapReduxStateToProps);

export default invokedConnect(Sidebar);
