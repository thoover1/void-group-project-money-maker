import React from "react";
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from './reducer';
import "./App.scss";
import Header from './Components/Header/Header';
import Landing from './Components/Landing/Landing';
import AuthComponent from './Components/Login/AuthComponent';
import Main from './Components/Main/Main';
import Profile from './Components/Profile/Profile';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/login-register' component={AuthComponent} />
          <Route path='/dashboard' component={Main} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState){
  return reduxState
};
const mapDispatchToProps = {
  setUser
}
const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(withRouter(App));