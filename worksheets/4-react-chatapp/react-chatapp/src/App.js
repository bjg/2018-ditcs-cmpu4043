import React from 'react';
import './App.css';
import ChatEnv from './chatEnv';
import LoginForm from './login';
import fBase from './config/fBase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fBase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    })
  }

  render() {
    if (this.state.loggedIn) {
      return (<ChatEnv />);
    }
    else {
      return (<LoginForm />);
    }
  }
}

export default App;