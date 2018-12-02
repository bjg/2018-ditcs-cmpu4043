/*
  Name: Robert Vaughan
  Student Number: C15341261

  The following is a React.JS script with Material UI

  Header.js
    Within Material UI, one is provided with a rich set
    of UI frameworks and assest to make their application
    fall to Google standards (yay?). This Component just renders
    a AppBar Header to the user and with a dynamic button
    for logging out that is present only if there is a logged
    in state.

    Tutorial and setup found at:
      https://material-ui.com/
*/

import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import * as firebase from "firebase";

/*
  Global stylings that
  are cast to the Component
  on export
*/
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {  
  state = {
    auth: false,
  };

  componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
      user ? this.setState({ auth:true }) : this.setState({ auth: null })
    });
  }

  /*
    Logs out user and therefore
    will cause the Login Component
    to render
  */
  logout() {
    firebase.auth().signOut();
  }

  /*
    Renders logout button
  */
  logOutButton() {
    if (this.state.auth) {
      return (<Button color="inherit" onClick={(event) => { this.logout(); }}>Logout</Button>)
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#474B4F' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              ChatLive
            </Typography>
            {this.logOutButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);