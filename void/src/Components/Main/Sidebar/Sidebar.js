import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import "./Sidebar.scss";
import axios from "axios";

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      members: [],
      allUsers: [],
      findUser: false,
      userID: Number(),
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
    this.groupMembers = this.groupMembers.bind(this);
    this.addUser1 = this.addUser1.bind(this);
    this.addUser2 = this.addUser2.bind(this);
    this.addUser3 = this.addUser3.bind(this);
    this.addUser4 = this.addUser4.bind(this);
    this.addUser5 = this.addUser5.bind(this);
    this.addUser6 = this.addUser6.bind(this);
    this.addUser7 = this.addUser7.bind(this);
    this.addUser8 = this.addUser8.bind(this);
    this.addUser9 = this.addUser9.bind(this);
    this.addUser10 = this.addUser10.bind(this);
  }

  componentDidMount() {
    this.groupMembers();
    // this.allUsers();
  }

  async groupMembers() {
    const res = await axios.get(`/api/group_members`);
    const { data } = await res;
    this.setState({
      members: data
    });
  }

  addUser1() {
    axios.post(`/api/add_user1`).then(res => {
      this.setState({
        user1: res.data
      });
    });
  }

  addUser2() {
    axios.post(`/api/add_user2`).then(res => {
      this.setState({
        user2: res.data
      });
    });
  }

  addUser3() {
    axios.post(`/api/add_user3`).then(res => {
      this.setState({
        user3: res.data
      });
    });
  }

  addUser4() {
    axios.post(`/api/add_user4`).then(res => {
      this.setState({
        user4: res.data
      });
    });
  }

  addUser5() {
    axios.post(`/api/add_user5`).then(res => {
      this.setState({
        user5: res.data
      });
    });
  }

  addUser6() {
    axios.post(`/api/add_user6`).then(res => {
      this.setState({
        user6: res.data
      });
    });
  }

  addUser7() {
    axios.post(`/api/add_user7`).then(res => {
      this.setState({
        user7: res.data
      });
    });
  }

  addUser8() {
    axios.post(`/api/add_user8`).then(res => {
      this.setState({
        user8: res.data
      });
    });
  }

  addUser9() {
    axios.post(`/api/add_user9`).then(res => {
      this.setState({
        user9: res.data
      });
    });
  }

  addUser10() {
    axios.post(`/api/add_user10`).then(res => {
      this.setState({
        user10: res.data
      });
    });
  }

  // openUserSearch() {
  //   this.setState({
  //     findUser: !findUser
  //   });
  // }

  render() {
    // console.log(777, this.state.members);
    const user = this.state.members;
    return (
      <div className='sidebar-container'>
        <div className="sidebar-background">
          <div className="inner">
            <span>
              <FaBars className="ham-menu" />
            </span>
            <span className="user-around">
              <button onClick={this.addUser1}>
                <div className="user-avi">{user.user1}</div>
              </button>
              <div className="user-avi">{user.user2}</div>
              <div className="user-avi">{user.user3}</div>
              <div className="user-avi">{user.user4}</div>
              <div className="user-avi">{user.user5}</div>
              <div className="user-avi">{user.user6}</div>
              <div className="user-avi">{user.user7}</div>
              <div className="user-avi">{user.user8}</div>
              <div className="user-avi">{user.user9}</div>
              <div className="user-avi">{user.user10}</div>
            </span>
            <span>
              <MdMoreHoriz className="three-dots" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
