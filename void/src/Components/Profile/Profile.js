import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../reducer';
import {Redirect} from 'react-router-dom';
import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      img: "",
      loggedInUser: false,
      editName: false,
      editEmail: false,
      editPassword: false,
      editImage: false,
      oldPassword: '',
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePic = this.updatePic.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      loggedInUser : true
    })
    // this.props.changeTitle('Login')
  }

 updateUsername() {
  axios.put(`/api/update_username`, {username: this.state.username}).then(res => {
    this.props.setUser(res.data[0])
  });
 };

 updateEmail() {
  axios.put(`/api/update_email`, {email: this.state.email}).then(res => {
    this.props.setUser(res.data[0])
  });
 };

 updatePassword() {
  axios.put(`/api/update_password`, {password: this.state.password, oldPassword: this.state.oldPassword}).then(res => {
    this.props.setUser(res.data[0])
  });
 };

 updatePic() {
  axios.put(`/api/update_pic/`, {image: this.state.img}).then(res => {
    this.props.setUser(res.data[0])
  });
 };

 async deleteAccount(user_id) {
  const deletedUser = await axios.delete(`/api/delete_account`);
  
  this.setState({
    user: deletedUser.data
  });
 };

 toggle(prop, val){
   this.setState({
     [prop]: val
   })
 }

  render() {
    console.log(this.props.user)
    const { editName, editEmail, editPassword, editImage, username, email, password, img } = this.state;
    return (
      <div className='profile-main'>
        <div className='account'>
          <h1 className='account-text'>My Account</h1>
        </div>
        <div className='profile-display'>
          {editImage 
            ? <div className='picture-holder'> <input onChange={(e) => {this.toggle('img', e.target.value)}} placeholder='New Image' />
              <button onClick={() => {img ? this.updatePic() : (window.alert('Please input a new image.')); this.toggle('editImage', false);}} >Save</button> </div>
              : <div className='picture-holder'> 
                  <img src={this.props.user.image} className='user-image' onClick={() => this.toggle('editImage', true)} /> 
                    <div className='middle'>
                      <div className='image-text' onClick={() => this.toggle('editImage', true)}>Change Picture</div>
                    </div>
                </div>
          }
          <div className='info-holder'>
          {editName 
            ? <div className='username-holder'> <input onChange={(e) => {this.toggle('username', e.target.value)}} placeholder='New Username' />
              <button onClick={() => {username ? this.updateUsername() : (window.alert('Please enter a new username')); this.toggle('editName', false);}} >Save</button> </div>
            : <div className='username-holder'> <label className='username'>Username: {this.props.user.username}</label>
              <button onClick={() => this.toggle('editName', true)}>Edit</button> </div>
          }
          {editEmail
            ? <div className='email-holder'> <input onChange={(e) => {this.toggle('email', e.target.value)}} placeholder='New Email' />
              <button onClick={() => {email ? this.updateEmail() : (window.alert('Please enter a new email')); this.toggle('editEmail', false);}} >Save</button> </div>
            : <div className='email-holder'> <label className='email'>Email: {this.props.user.email}</label>
              <button onClick={() => this.toggle('editEmail', true)}>Edit</button> </div>
          }
          {editPassword
            ? <div className='password-holder'> 
              <input type='password' onChange={(e) => {this.toggle('oldPassword', e.target.value)}} placeholder='Current Password' />
              <input type='password' onChange={(e) => {this.toggle('password', e.target.value)}} placeholder='New Password' />
              <button onClick={() => {password ? this.updatePassword() : (window.alert('Please enter a new password')); this.toggle('editName', false);}} >Save</button> </div>
            : <div className='password-holder'> <label className='password'>Change Password</label>
              <button onClick={() => this.toggle('editPassword', true)}>Edit</button> </div>
          }
          <button className='delete-account-btn' onClick={() => {this.deleteAccount(); this.props.setUser(null)}}>Delete Account</button>
          </div>
        </div>
      </div>
    );
  }
};

function mapReduxStateToProps(reduxState) {
  return reduxState
}

const mapDispatchStateToProps = {
  setUser
}

const invokedConnect = connect(mapReduxStateToProps, mapDispatchStateToProps);

export default invokedConnect(Profile);
