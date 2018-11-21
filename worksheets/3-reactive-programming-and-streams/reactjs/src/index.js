import React from 'react';
import { render } from 'react-dom';

import * as firebase from 'firebase';

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { UserInput } from './components/UserInput';


  // Initialize Firebase
const API_KEY = process.env.FIRE_BASE_KEY;
var config = {
    apiKey: API_KEY,
    authDomain: "richwebreactjs.firebaseapp.com",
    databaseURL: "https://richwebreactjs.firebaseio.com",
    projectId: "richwebreactjs",
    storageBucket: "richwebreactjs.appspot.com",
    messagingSenderId: "370447802903"
};

firebase.initializeApp(config);

/*
const db = firebase.database();
const dbref = db.ref().child('data');

dbref.on('value',snapshot => {
    this.setState({
        data: snapshot.val()
    })
})
*/
class App extends React.Component {

    constructor(){
        super();
        this.state = {
            user: "test user"
        };
    }
    /*
    componentDidMount(){
        const rootRef = firebase.database().ref().child('react');
        const speedRef = rootRef.child('speed');
        speedRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            })
        });
    }
    */
    render(){
        return(
            <div className="App">
                <div>
                    <Header chatName={"Awesome Chat V1.0"}></Header>
                </div>
                <div>
                    <UserInput user={this.state.user}></UserInput>
                </div>
            </div>
        )
    }

}

render(<App />, window.document.getElementById('app'));