import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Form from '../Form/Form.js';
import firebase from 'firebase';
import Popup from "reactjs-popup";
import firebaseConfig from '../../config';
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
	  console.log(user);
    });
  }
  handleSignIn() {
    const provider = new firebase.auth().signInAnonymously().catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	 });
  }
  handleLogOut() {
    firebase.auth().signOut();
	this.state.user= null;
  }
  render() {
    return (
      <div className="app">
        <div className="app__header">
          <h2>
            CHAT APPLICATION
          </h2>
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div>
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}
export default App;