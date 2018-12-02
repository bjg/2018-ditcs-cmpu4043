import React from 'react';
import fBase from './config/fBase';
import LoginForm from './login';
import Header from './header';
import './login.css';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            emailConfirm: '',
            password: '',
            passwordConfirm: '',
            successful: false
        }
        this.defaultState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.authListener = this.authListener.bind(this);
    }

    reset() {
        this.setState(this.defaultState);
    }

    handleChange(event) {
        const target = event.target.name;
        this.setState({
            [target]: event.target.value
        });
    }

    handleRegister(event) {
        if (this.state.email !== this.state.emailConfirm) {
            console.log("Invalid input: Emails must be the same");

            if (this.state.password !== this.state.passwordConfirm) {
                console.log("Invalid input: Passwords must be the same.");
            }
            //prevent from returning to default page
            event.preventDefault();
        }
        else {
            fBase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch(e => {
                    if (e.message !== "The email address is already in use by another account.") {
                        this.reset();
                        this.setState({ successful: true });
                    }
                    else {
                        console.log(e.message);
                    }
                });
            event.preventDefault();
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fBase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                fBase.database().ref('users/' + firebaseUser.uid).set({
                    email: firebaseUser.email,
                    name: this.state.name
                });
            }
        });
    }

    render() {
        if (this.state.successful) {
            return (<LoginForm />);
        }
        else {
            return (
                <div>
                    <Header />
                    <form className="loginRegisterForm">
                        <input
                            className="loginInput"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <input
                            className="loginInput"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            className="loginInput"
                            type="text"
                            name="emailConfirm"
                            placeholder="Confirm Email"
                            value={this.state.emailConfirm}
                            onChange={this.handleChange}
                        />
                        <input
                            className="loginInput"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <input
                            className="loginInput"
                            type="password"
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            value={this.state.passwordConfirm}
                            onChange={this.handleChange}
                        />
                        <button
                            className="defaultButton"
                            id="register"
                            onClick={this.handleRegister}
                        >Register</button>
                    </form>
                </div>
            );
        }
    }
}

export default RegistrationForm;