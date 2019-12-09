import React from "react";
import './Landing.scss';

export default class Landing extends React.Component {

  componentDidMount(){
    this.props.changeTitle('Login');
  }

  render(){
    return (
      <div className='home-main'>
        <div className='picture-element'>
          <div className='headers-container'>
            <h2>IT'S TIME TO ENTER</h2>
            <h1>THE VOID</h1>
          </div>
        </div>
        <div className='dark-color-block'>Changing the Way You Work As A Group</div>
        <div className='icon-block'>
          <div className='dashboard-icon-container'>
            <img className='dashboard-icon' src='https://image.flaticon.com/icons/svg/348/348186.svg'/>
            View All of Your Group's Tasks in Your Dashboard
          </div>
          <div className='chat-icon-container'>
            <img className='chat-icon' src='https://image.flaticon.com/icons/svg/2025/2025049.svg' />
            Chat Live with Everyone In Your Group
          </div>
        </div>
        {/* <div className='light-color-block'>Text</div> */}
      </div>
    );
  }
}
