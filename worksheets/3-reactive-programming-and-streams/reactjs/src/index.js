import React from 'react';
import { render } from 'react-dom';

import * as firebase from 'firebase';

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { UserInput } from './components/UserInput';
import { creds } from './keys';



// Initialize Firebase
var config = {
    apiKey: creds.REACT_APP_API_KEY,
    authDomain: creds.REACT_APP_AUTH_DOMAIN,
    databaseURL: creds.REACT_APP_DATABASE_URL,
    projectId: creds.REACT_APP_PROJECT_ID,
    storageBucket: creds.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: creds.REACT_APP_MESSAGING_SENDER_ID
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

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                //console.log(user);  
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

        let email = this.state.user;

        if(email === null){
            console.log("TODO: log out to fix null email")
        }
        else{
            let userNameParsed = email.substring(0, email.indexOf("@"));
            this.setState({
                userName:userNameParsed,
            })    
        }
    }

    signUpUser(){
        const promise = auth.createUserWithEmailAndPassword(this.state.user,this.state.password)

        promise.catch(e => console.log(e.message));
        console.log("Signed up and Signed in");

        //Parse the email for the chars before @ to be used for username
        let email = this.state.user;

        if(email === null){
            console.log("TODO: log out to fix null email")
        }
        else{
            let userNameParsed = email.substring(0, email.indexOf("@"));
            this.setState({
                userName:userNameParsed,

            })
        }
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
                            <UserInput  user={this.state.user} userName={this.state.userName}></UserInput>
                        </div>
                        <div>
                        <button onClick={this.signOut.bind(this)} className="btn btn-primary">Log Out</button>

                        </div>
                    </div>
                    )}
                </div>

                

                
                
            </div>
        )
    }

}

render(<App />, window.document.getElementById('app'));