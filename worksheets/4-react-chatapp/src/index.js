/***
 * Application Name:   Chat App
 * Application Status: Stable Lab Release
 * Version:            v1.0
 * Author:             Gabriel Grimberg
 *
 * About: - Support group chats between multiple parties in a single room.
 *        - Distributable statically, access to the build (prod) folder and hosted on Firebase.
 *        - Users can post messages to a given channel.
 *        - Other members can view these messages.
 *        - Ability to search for messages or a specific user.
 *        - Ability for users to Private Message each other.
 *        - Loading spinner while user waits for a result.
 *        - Secure Login and Register with validations.
 *        - Random avatar given to a user when they join.
 *        - Ability to create channels.
 *
 * Name: index.js
 *
 * Description: - The heart of the app.
 *              - Navigation based on if user is logged in or not.
 **/

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./chat/Auth/Login";
import Register from "./chat/Auth/Register";
import * as serviceWorker from './serviceWorker';
import firebase from "./firebase";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";
import { setUser, clearUser } from './actions';
import Spinner from './spinner';

// Create Global State
const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged(user => {
      
      if (user) { // If user is found.
        
        this.props.setUser(user); // Set user to global state.
        this.props.history.push("/"); // Redirect to main page.

      } else { // If user is not found

        this.props.history.push('/login'); // Redirect to login page.
        this.props.clearUser(); // Clear user from global state.

      }
    
    });

  }
  
  render() {

    // If still loading show spinner otherwise show routes.
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
      </Switch>
    );
  
  }
  
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser } )(Root));

// Only redirect if user is logged in.
// Provider will provide global state to any provider that wants to use it.
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();