import React from "react";
import {connect} from 'react-redux';
import {setUser} from '../../reducer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './AuthComponent.scss';

class AuthComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        username: '',
        password: '',
        email: '',
        register: false,
        failed: false
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(){
    const {username, password, email} = this.state;
    try {
      const registeredUser = await axios.post('/auth/register', {username, password, email});
      console.log(registeredUser.data)
      this.props.setUser(registeredUser.data);
    } catch (error) {
      this.setState({
        failed: true
      })
    }
  }

  async login(){
    const {password, email} = this.state;
    try {
        const loggedInUser = await axios.post('/auth/login', {password, email});
        this.props.setUser(loggedInUser.data);
    } catch (error) {
        this.setState({
        failed: true
        })
    }
  }

  render(){
    const {username, password, email, register, failed} = this.state;
    let errorMessage;
    if(failed && register) {
        errorMessage = <p className='error'>User already exists!</p>
    } else if(failed && !register) {
        errorMessage = <p className='error'>Incorrect email or password.</p>
    } else {
        errorMessage = <p className='error'></p>
    }

    return this.props.user ?
            (<Redirect to='/profile' />)
            : (<div className='auth-container'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(register){
                        this.register();
                    } else {
                        this.login();
                    }
                }}>
                    {errorMessage}
                    <div className='inputs'>
                        {register && (
                            <div className='username-i'>
                                <label>Username</label>
                                <input type='username' value={username} onChange={(e) => this.setState({
                                    username: e.target.value
                                })} />
                            </div>
                        )}
                        <div className='email-i'>
                            <label>Email</label>
                            <input type='email' value={email} onChange={(e) => this.setState({
                                email: e.target.value
                            })} />
                        </div>
                        <div className='password-i'>
                            <label>Password</label>
                            <input type='password' value={password} onChange={(e) => this.setState({
                                password: e.target.value
                            })} />
                        </div>
                        <button className='submit'>Submit</button>
                    </div>
                {!register && <button className='switcher' onClick={() => {this.setState({register: true, failed: false}); this.props.changeTitle('Register')}}>Switch to Register</button>}
                {register && <button className='switcher' onClick={() => {this.setState({register: false, failed: false}); this.props.changeTitle('Login')}}>Switch to Login</button>}
                </form>
            </div>
        )
  }
};

function mapReduxSateToProps(reduxState){
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const enhancedComponent = connect(
  mapReduxSateToProps,
  mapDispatchToProps
  );

export default enhancedComponent(AuthComponent);
