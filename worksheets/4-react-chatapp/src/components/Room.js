/*
  Name: Robert Vaughan
  Student Number: C15341261

  The following is a React.JS script with Material UI

  Room.js
    This is a massive script! In short, this Component
    renders three key features

    PM:
      On the left side of the rendered HTML,
      there is a a list of users, when a user clicks
      on one of the list items, the chat client
      renders the personal messages that the listed
      user and the current user have sent to each other

    Chatroom:
      In the center, the messages of the chatroom or a PM
      session are rendered to a user. By default, the global
      chatroom is rendered. This can be changed if a user choses
      between the list items on the left.

      If a displayed messsage was written by a user, they will be shown
      a Delete icon. When clicked, their message is removed and deleted
      from the DB

    Spotify Client (BONUS FEATURE#2):
      On the right, there is a Spotify player. If a user
      enters a valid Spotify Open URL, the album
      or track is displayed and a user can play
      a 30 second snippet of the loaded content.
      The full content can be played if a user
      has a logged in session to Spotify.
*/

import React, { Component } from "react";
import { TextField, List, ListItem, ListItemText, Grid, 
  ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "../css/Room.css";
import * as firebase from "firebase";

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = { textField:"", messages:[], allMessages:[], users:[],
    currentEmail:null, toUser:null, uri:null, 
    spotifyInput:"https://open.spotify.com/track/4zXa17K83Pp6N2yXdVc2sv?si=9vyciKJuTK-jGkB2xWapQw" };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    
    this.fetchUsers(rootRef);
    this.fetchMessages(rootRef);

    const user = firebase.auth().currentUser;
    this.setState({ currentEmail:user.email });
  }

  /*
    Overrides chatroom messages in the chatroom
    to PM messages if the user has a clicked on a listed
    users
  */
  renderUserMessage(messages) {
    let username = this.state.toUser;
    let userMessages = [];

    messages.map(message => {
      if (message.from === username && message.to === this.state.currentEmail) {
        userMessages.push(message);
      }
      else if (message.from === this.state.currentEmail && message.to === username) {
        userMessages.push(message);
      }
    });
    return userMessages;
  }

  /*
    Generates the Chatroom messages
  */
  renderRoomMessage(messages) {
    let roomMessages = [];

    messages.map(message => {
      if (message.to == null || message.to === "") {
        roomMessages.push(message);
      }
    });
    return roomMessages;
  }

  /*
    Loads in all messages from the DB
    and formats them into an object structure
    that will allow for filtering between chatroom
    and PM
  */
  fetchMessages(rootRef) {
    const messageRef = rootRef.child("room").child("messages");

    messageRef.on("value", snapshot => {
      let allMessages = [];
      snapshot.forEach(child => {
        let message = child.val();
        allMessages.push({ id:child.key, to:message.to, from:message.from, message:message.message });
      });
      if (this.state.toUser == null) {
        this.setState({ messages:this.renderRoomMessage(allMessages), allMessages:allMessages });
      }
      else {
        this.setState({ messages:this.renderUserMessage(allMessages), allMessages:allMessages });
      }
    });
  }

  /*
    Loads in all users from the DB
    and adds them to the state object
  */
  fetchUsers(rootRef) {
    const userRef = rootRef.child("users");

    this.state.currentEmail = firebase.auth().currentUser.email;

    userRef.on("value", snapshot => {
      let allUsers = [];
      snapshot.forEach(child => {
        let user = child.val();
        if (user !== this.state.currentEmail) {
          allUsers.push({ id:child.key, user:user });
        }
      });
      this.setState({ users: allUsers });
    });
  }

  /*
    Removes a message by its passed messsage index key
  */
  removeMessage(messageKey) {
    const rootRef = firebase.database().ref();
    const messageRef = rootRef.child("room").child("messages").child(messageKey);
    messageRef.remove();
  }

  /*
    Shows the delete icon next to the a message
    if it was written by the current user
  */
  showDeleteButton(fromUser, messageKey) {
    if (fromUser === this.state.currentEmail) {
      return (
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete"
            onClick={(event) => { 
              this.removeMessage(messageKey); 
            }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      );
    }
  }

  /*
    Loads messages stored in the state to the user
  */
  renderMessages(messages) {
    return messages.map(message => {
      return (
        <ListItem key={message.id}>
          <ListItemText
            style={{whiteSpace: 'normal', wordWrap:'break-word'}}
            primary={message.message}
            secondary={message.from}
          />
          {this.showDeleteButton(message.from, message.id)}
        </ListItem>
      );
    })
  }

  /*
    Assigns a recipient to the the state
    so when a message is sent, it is sent
    to a user rather than the gneral room
  */
  userMessages(username) {
    this.state.toUser = username;
    this.fetchMessages(firebase.database().ref());
  }

  /*
    Assigns a null recipient to the the state
    so when a message is sent, it is sent to
    the chatroom
  */
  roomMessages() {
    this.state.toUser = null;
    this.fetchMessages(firebase.database().ref());
  }

  /*
    Renders the list of users that are present in the DB
    ad handles the rendering of their messages if an
    onClick occurs
  */
  renderUsers(props) {
    return props.users.map(user => (
      <ListItem
      key={user.id}
      button
      onClick={(event) => { 
        this.userMessages(user.user); 
      }}>
        <ListItemText
          inset
          primary={user.user}
        />
      </ListItem>
    ))
  }

  /*
    Takes the drafted message within the state and sends
    said message to the DB
  */
  sendRoomMessage() {
    const rootRef = firebase.database().ref();
    const messageRef = rootRef.child("room").child("messages");

    messageRef.push({ to:this.state.toUser, from:this.state.currentEmail, message:this.state.textField });
  }

  /*
    Handles processing if the user clicked enter when
    tpying in the chatroom
  */
  enterCheck(event) {
    if (event.key === "Enter") {
      if (event.charCode === 13 && this.state.textField.trim() !== "") {
        this.sendRoomMessage();
        this.setState({ textField: "" });
      }
      event.preventDefault();
    }
  }

  /*
    Renders Chatroom input box for messages to be sent
    If a user types enter, the text in the field is
    encapsulated into a message and sent
  */
  renderInput() {
    return(
      <div className="Input">
        <TextField
          fullWidth
          label="Be Social (Enter to Send)"
          onChange={event => this.setState({ textField: event.target.value })}
          value={this.state.textField}
          onKeyPress = {(event) => {
            this.enterCheck(event);
          }}
        />
      </div>
    )
  }

  /*
    Renders the Spotify supported iFrame to the user
    if they enter a spotify URL
  */
  renderFrame() {
    return (
        <iframe className="IFrame" title="Spotify" src={this.state.uri}
        frameborder="0" allowtransparency="false" allow="encrypted-media"></iframe>
    );
  }

  /*
    Handles processing if the user clicked enter when
    tpying in a Spotify URL
  */
  enterSpotifyCheck(event) {
    if (event.key === "Enter") {
      if (event.charCode === 13 && this.state.spotifyInput.trim() !== "") {
        const spotifyURL = this.state.spotifyInput.slice(0, 24) 
        +"/embed" + this.state.spotifyInput.slice(24);
        this.setState({ uri:spotifyURL})
      }
    }
  }

  /*
    Renders the Spotify input box
    If a user types enter, the link in the field is
    parsed and formatted for the approved Spotify
    supported widget
  */
  renderSpotifyInput() {
    return(
      <div className="SPInput">
        <TextField
          fullWidth
          label="Spotify URL (Enter to Send)"
          onChange={event => this.setState({ spotifyInput: event.target.value })}
          value={this.state.spotifyInput}
          onKeyPress = {(event) => {
            this.enterSpotifyCheck(event);
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="Room">
        <Grid container>
            <Grid item sm={3}
            className="Grid">
              <List className="Users">
                  <ListItem
                  key="room"
                  button
                  onClick={(event) => { 
                    this.roomMessages(); 
                  }}>
                    <ListItemText
                      inset
                      primary={"ROOM"}
                    />
                  </ListItem>
                  {this.renderUsers(this.state)}
              </List>
            </Grid>
            <Grid item sm={6}>
              <List className="Messages">
                {this.renderMessages(this.state.messages)}
              </List>
            {this.renderInput()}
          </Grid>
          <Grid item sm={3}
          className="Grid">
            {this.renderSpotifyInput()}
            {this.state.uri != null && this.renderFrame()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Room;