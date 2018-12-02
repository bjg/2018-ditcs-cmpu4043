import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import firebase from 'firebase';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig); // Initialize firebase

class App extends Component
{
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      user: null,
    }
  }

  render() 
  {
    return (
      <div className="app">
        <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />

          <h2>
            CHAT ROOM
          </h2>
        </div>

        <div className="chat__list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default App;