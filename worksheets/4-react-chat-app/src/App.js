import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

// Pages as Components
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';

// Firebase
import { withFirebase } from '../src/components/Firebase';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';

// Auth User Context to access the users session
import { AuthUserContext, withAuthentication } from './components/Session';

// Configure dotenv
require('dotenv').config();

console.log(process);

const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route exact path={ROUTES.CHAT} component={Chat} />
    </div>
  </Router>
);

export default withAuthentication(App);
