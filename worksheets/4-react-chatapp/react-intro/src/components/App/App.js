import React, { Component } from 'react';
import './App.css';
import Form from '../Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from '../../config';
firebase.initializeApp(firebaseConfig);
class App extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }
    render() {
        return (
            <div className="app">
                <div className="app__header">
                    <h2>
                        Basic Chat Application
                    </h2>
                    <h3>
                        Click another users name to open a private chat with them and see if they messaged you
                    </h3>
                </div>
                <div className="app__list">
                    <Form/>
                </div>
            </div>
        );
    }
}
export default App;

