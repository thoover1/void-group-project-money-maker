import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setSidebar } from "./reducer";
import "./App.scss";
import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing";
import AuthComponent from "./Components/Login/AuthComponent";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Login"
    };
    this.changeTitle = this.changeTitle.bind(this);
  }

  changeTitle(title) {
    this.setState({
      title: title
    });
  }

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} user={this.props.user} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Landing changeTitle={this.changeTitle} setSidebar={this.props.setSidebar} {...props} />
            )}
          />
          <Route
            path="/login-register"
            render={props => (
              <AuthComponent changeTitle={this.changeTitle} {...props} />
            )}
          />
          {this.props.user && (
            <Route
            path="/dashboard"
            render={props => <Main changeTitle={this.changeTitle} {...props} />}
            />
          )}
          <Route path="/join" render={props => (
            <Join changeTitle={this.changeTitle} {...props}/>
          )} />
          <Route path="/chat" render={props => (
            <Chat changeTitle={this.changeTitle} {...props} />
          )} />
          {this.props.user && (
            <Route
              path="/profile"
              render={props => (
                <Profile changeTitle={this.changeTitle} {...props} />
              )}
            />
          )}
          <Route
            path="*"
            render={() => {
              return <Redirect to="/login-register" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}
const mapDispatchToProps = {
  setUser,
  setSidebar
};
const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(withRouter(App));
