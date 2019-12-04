import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      img: "",
      loggedInUser: false,
      editInfo: false
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePic = this.updatePic.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    this.setState({
      loggedInUser : true
    })
    // this.props.changeTitle('Login')
  }

 updateUsername(user_id, username) {
  axios.put(`/api/update_username/${user_id}`, {username}).then(res => {
    this.setState({
      username: res.data
    });
  });
 };

 updateEmail(user_id, email) {
  axios.put(`/api/update_email/${user_id}`, {email}).then(res => {
    this.setState({
      email: res.data
    });
  });
 };

 updatePassword(user_id, password) {
  axios.put(`/api/update_password/${user_id}`, {password}).then(res => {
    this.setState({
      password: res.data
    });
  });
 };

 updatePic(user_id, img) {
  axios.put(`/api/update_pic/${user_id}`, {img}).then(res => {
    this.setState({
      img: res.data
    });
  });
 };

 async deleteAccount(user_id) {
  const deletedUser = await axios.delete(`/api/${user_id}`);
  
  this.setState({
    user: deletedUser.data
  });
 };


  render() {
    const { username, email, password, img, loggedInUser, editInfo } = this.state;
    let display;
    if(loggedInUser) {
      display = <div className='profile-display'>
    <label>Username: {username}</label>
    <label>Email: {email}</label>
      </div>
    }

    return (
      <div className='profile-main'>
        <div className='profile-form-container'>
          <form onSubmit={e => { e.preventDefault(); this.handleChange()}}>
            <div className='update-user-input'>
              <label>Username: </label>
               <input value={username} onChange={(e) => this.setState ( { username: e.target.value } )} /> 
            </div>
            <div className='update-user-input'>
              <label>Email: </label>
              <input type="email" value={email} onChange={(e) => this.setState ( { email: e.target.value } )} />
            </div>
            <div className='update-user-input'>
              <label>Password: </label>
              <input type="password" value={password} onChange={(e) => this.setState ( { password: e.target.value } )} />
            </div>
            <div className='update-user-input'>
              <label>Pic: </label>
              <input value={img} onChange={(e) => this.setState ( { img: e.target.value } )} />
            </div>
            <button className='save-profile-updates-btn'>Save</button>
            </form>
            <button className='delete-account-btn' onClick={() => this.deleteAccount()}>Delete Account</button>
        </div>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState
}

export default connect(mapReduxStateToProps)(Profile);
