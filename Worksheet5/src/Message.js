import React, {Component} from 'react';
import './Message.css';


export default class Message extends Component 
{
  //This returns the users name along with a message
  // FB mesage/username is how it connects to firebase
  render() 
  {
    return (
      <div className="cssMessage">
                <span className="cssUsername">
                  {this.props.fbMessage.fbUsername}: 
                </span>
        {this.props.fbMessage.fbMessage} 
      </div>
    )
  }
}