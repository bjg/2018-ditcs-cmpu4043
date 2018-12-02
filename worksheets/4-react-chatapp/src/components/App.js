/*
  Name: Robert Vaughan
  Student Number: C15341261

  The following is a React.JS script with Material UI

  App.js
    This script is a wrapper that controls what Components
    to render based on a users login state within Firebase.
    If a user is logged in, they are sent to the Chatroom.
    Otherwise, they are sent to a Login. Therefore, there
    is a login listener for Firebase running constantly
*/

import React, { Component } from "react";
import "../css/App.css";
import Login from "./Login";
import Room from "./Room";
import Header from "./Header"
import * as firebase from "firebase";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:null
    };
  }

  // Initializes the user listener
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? this.setState({ user }) : this.setState({ user: null })
    });
  }

  render() {
    return (
      <div className="App">
      <Header/>
        {this.state.user ? (<Room/>) : (<Login />)}
      </div>
    );
  }
}

export default App;