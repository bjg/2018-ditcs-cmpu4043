import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from '../Login/Login'
import Chat from '../Chat/Chat'
import Error from '../Error/Error'

import firebase from 'firebase';
import firebaseConfig from '../../config';

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }

    }
    handleLogin(user) {
        this.setState({user: user});
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" render={(props) => <Chat {...props} user={this.state.user} group={this.props.group}/> } exact/>
                    <Route path="/login" render={(props)=> <Login {...props} group={this.props.group} setUser={this.handleLogin.bind(this)} /> }/>
                    <Route component={Error}/>
                </Switch>
            </Router>
        );
    }
}