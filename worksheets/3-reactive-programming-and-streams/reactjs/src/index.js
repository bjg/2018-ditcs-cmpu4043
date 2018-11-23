import React from 'react';
import { render } from 'react-dom';

import * as firebase from 'firebase';

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { UserInput } from './components/UserInput';
import { throws } from 'assert';


// Initialize Firebase
//const API_KEY = process.env.FIRE_BASE_KEY;
//!!!REMOVE THIS!!!!
const API_KEY = "AIzaSyACVkUIo0P6x3XfwRyfSfUUu908qoRMnAA";

var config = {
    apiKey: API_KEY,
    authDomain: "richwebreactjs.firebaseapp.com",
    databaseURL: "https://richwebreactjs.firebaseio.com",
    projectId: "richwebreactjs",
    storageBucket: "richwebreactjs.appspot.com",
    messagingSenderId: "370447802903"
};

firebase.initializeApp(config);

const auth = firebase.auth();


class App extends React.Component {

    constructor(){
        super();
        this.state = {
            user: null,
            loggedIn: false,
            userName: null
        };

        //this.setUserNameFromEmail = this.setUserNameFromEmail.bind(this);
    }

    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log(user);  
                this.setState({
                    loggedIn: true
                });
                  
            }else
            {
                this.setState({loggedIn: false});
                
            }
            
        });
    }


    onEmailInput(ev){
        this.setState({user: event.target.value});
    }

    onPasswordInput(ev){
        this.setState({password: event.target.value});
    }

    logInUser(){
        const promise = auth.signInWithEmailAndPassword(this.state.user,this.state.password);
        promise.catch(e => console.log(e.message));
    }

    signUpUser(){
        const promise = auth.createUserWithEmailAndPassword(this.state.user,this.state.password)

        promise.catch(e => console.log(e.message));
        console.log("Signed up and Signed in");
        

    }

    signOut(){
        const promise = auth.signOut();
        promise.catch(e => console.log(e.message));
        console.log("Signed out");

        
    }

    render(){
        
        return(
            <div className="App">
                <div>
                    <Header chatName={"Awesome Chat V1.0"}></Header>
                </div>
                <div>
                
                    {!this.state.loggedIn ? (
                    <div>
                        <input
                        className="form-group mx-sm-3 mb-2"
                        type="text"
                        placeholder="Enter Email"
                        onChange={this.onEmailInput.bind(this)}/> 


                        <br></br>
                        <input
                        className="form-group mx-sm-3 mb-2"
                        type="password"
                        placeholder="Enter Password"
                        onChange={this.onPasswordInput.bind(this)}/>

                        <br></br>
                        <button onClick={this.logInUser.bind(this)} className="btn btn-primary">Log In</button>
                        <button onClick={this.signUpUser.bind(this)} className="btn btn-primary">Sign Up</button>
                    </div>
                    ):(
                    <div>
                        <div>
                            <UserInput user={this.state.user}></UserInput>
                        </div>
                        <div>
                        <button onClick={this.signOut.bind(this)} className="btn btn-primary">Log Out</button>
                        {/*<button onClick={this.deleteMessages.bind(this)} className="btn btn-primary">Delete All My Messages</button>*/}

                        </div>
                    </div>
                    )}
                </div>

                

                
                
            </div>
        )
    }

}

render(<App />, window.document.getElementById('app'));