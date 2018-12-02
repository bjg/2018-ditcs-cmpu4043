import React, { Component } from 'react';
import './Form.css';
import Message from './Message';
import firebase from 'firebase';
export default class Form extends Component 
{

  constructor(props) 
  {
    super(props);
    this.state = 
    {
      fbUsername: 'Luke Marshell',
      fbMessage: '',
      list: [],
    };

    // Places messege into firebase database called "FireBaseMessages"
    this.myRef = firebase.database().ref().child('FirebaseMessages');
    this.listMessages();
  }

  //What is put in the input bar is placed in fb
  //This also stops it from freezing
  inputMessageChange(event) 
  {
    this.setState({fbMessage: event.target.value});
  }

  inputNameChange(event)
  {
    this.setState({fbUsername: event.target.value});
  }

  // Takes what is in the input bar and pushes it to the list of messages
  // It will then reset FBMessage to NULL
  sendMessage() 
  {
    if (this.state.fbMessage) 
    {
      var newItem = 
      {
        fbUsername: this.state.fbUsername,
        fbMessage: this.state.fbMessage,
      }

      this.myRef.push(newItem);
      this.setState({ fbMessage: '' });
    }

    console.log("Message Sent!");
  }

  // If they press the ENTER button
  enterButton(event) 
  {
    if (event.key !== 'Enter') return;
    this.sendMessage();
  }

  // Set new Name for the user
  newName()
  {
    if(this.state.fbUsername)
    {
      var newName =
      {
        fbUsername: this.state.fbUsername,
        fbMessage: "New User has entered the chatroom!",
      }

      this.myRef.push(newName);
      this.setState({ fbMessage: '' });
      
    }
  }

  // Recall Messages DO NOT USE I WIPED MY DATABASE
  /*recallMessage()
  {
    this.myRef.remove(newName);
  }*/

  listMessages()
  {
    //const myRef: firebase.database.Reference = firebase.database().ref().child('FirebaseMessages');
    //myRef .on('value', allMessages => {
      //this.setState = allMessages.val();
    //});//

    this.myRef
      .limitToLast(10)
      .on('value', allMessages => {
        this.setState({
          list: Object.values(allMessages.val()),
        });
      });

  }

  //Renders HTML output
  render() 
  {
    return (

      <div className="form">

        <div className="messegeList">
          { this.state.list.map((item, index) =>
            <Message key={index} fbMessage={item} />
          )}
        </div>

        <div className="inputMessegeRow">

          <input
            className="typeMessage"
            type="text"
            placeholder="Type message"
            value={this.state.fbMessage}

            onChange={this.inputMessageChange.bind(this)}
            onKeyPress={this.enterButton.bind(this)}
          />

          <button
            className="messageBtn"
            onClick={this.sendMessage.bind(this)}>

            Send
          </button>

        </div>

        <div>

        <input
            className="inputName"
            type="text"
            placeholder="Enter new Name"
            value={this.state.fbUsername}

            onChange={this.inputNameChange.bind(this)}
          />

          <button
           className="nameBtn"
            onClick={this.newName.bind(this)}>

            Set new Name
          </button>


        </div>

      </div>
    );
  }
}