/*
  Name: Robert Vaughan
  Student Number: C15341261

  The following is a React.JS script with Material UI

  Login.js
    This script creates the Login Component. This
    Component renders a Login and Register field.
    When a user clicks either the Login or Register
    button, the data in the fields are passed into
    functions that are sent to firebase to initalize
    an auth session. If the data is invalid, the
    correct error messages will appear to the user

  BONUS FEATURE #1
    Firebase Auth. I have another feature listed in my Room.js file
*/

import React, { Component } from "react";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
import "../css/Login.css";
import * as firebase from "firebase";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { email:"test@test.com", password:"123456", error:"" };
  }

  // Handles the Login Button event and
  // creates a firebase auth session
  loginUser(event) {
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
      console.log("Hi");
    }).catch((error) => {
      this.setState({error:error.message});
    });
  }

  // Handles the Register Button event and
  // creates a firebase auth session
  registerUser(event) {
    event.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
      this.storeUser(this.state.email);
    }).catch((error) => {
      this.setState({error:error.message});
    });
  }

  /*
    Stores the user email in a list 
    in the Firebase DB. This is for
    PM for Firebase Auth does not return
    a list of users for security reasons
  */
  storeUser(newUser) {
    const usersRef = firebase.database().ref().child("users");
    usersRef.push(newUser);
  }

  render() {
    return (
      <div className="Login">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">
            <Paper className="Paper">
              <TextField
                label="Email"
                onChange={event => this.setState({ email: event.target.value })}
                value={this.state.email}
              />
              <TextField
                label="Password"
                onChange={event => this.setState({ password: event.target.value })}
                value={this.state.password}
              />
              <div className="Login-Button">
                <Button variant="contained" style={{ backgroundColor:'#474B4F', color:'#FFFFFF' }} onClick={(event) => { this.loginUser(event); }}>
                  Login
                </Button>
                <Button variant="contained" onClick={(event) => { this.registerUser(event); }}>
                  Register
                </Button>
              </div>
              <Typography className="Login-Error" style={{ color: "#A63232" }}>
                {this.state.error}
              </Typography>
            </Paper>
          </Grid>
      </div>
    );
  }
}

export default Login;