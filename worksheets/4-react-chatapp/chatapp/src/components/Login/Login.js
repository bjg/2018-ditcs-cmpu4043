import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import firebase from 'firebase'
/**************************************************************
 *                                                            *
 *  Additional Feature                                        *
 *  The login system uses google authentication with Firebase *
 *                                                            *
 **************************************************************/
export default class Login extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                firebase.database().ref(this.props.group + '/users/' + user.uid).once("value", snapshot => {
                    if (!snapshot.exists()){
                        const id = '#' + Math.floor(1000 + Math.random() * 9000);
                        const userRef = firebase.database().ref().child(this.props.group + '/users/' + user.uid);
                        userRef.update({username: user.displayName+id});
                        user['username'] = user.displayName + id;
                        this.props.setUser(user);
                    } else {
                        firebase.database().ref().child(this.props.group + '/users/' + user.uid)
                            .on('value', snapshot => {
                                user['username'] = snapshot.val().username;
                                this.props.setUser(user);
                            });
                    }
                });
            }
        });
    }
    handleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }
    handleSignOut() {
        firebase.auth().signOut();
    }
    render() {
        if (firebase.auth().currentUser) {
            return (
                <Redirect to='/'/>
            )
        }

        return (
            <div className="container-fluid login-container">
                <div className="card login-card mx-auto">
                    <div className="card-body login-card-body">
                        <h5 className="card-title">Welcome!</h5>
                        <p className="card-text">Sign in with Google to start chatting</p>
                        <button className="login-button" onClick={this.handleSignIn.bind(this)}>Google Sign in</button>
                    </div>
                </div>
            </div>

        );
    }
}