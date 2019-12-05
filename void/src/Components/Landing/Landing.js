import React from "react";
import './Landing.scss';

export default class Landing extends React.Component {

  componentDidMount(){
    this.props.changeTitle('Login');
  }

  render(){
    return (
      <div className='home-main'>
        <h2>IT'S TIME TO ENTER</h2>
        <h1>THE VOID</h1>
      </div>
    );
  }
}
