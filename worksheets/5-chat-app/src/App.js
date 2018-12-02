import React, { Component } from 'react';
import './App.css';
import {fb, db} from './fire';
import {Chat} from './chat';
import Login from './login';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fb.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.username);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
     <div>{this.state.user ? (<Chat />) : ( <Login />)}</div>
)}
}

 export default App;