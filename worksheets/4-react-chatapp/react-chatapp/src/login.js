import React from 'react';
import fBase from './config/fBase';
import RegistrationForm from './register';
import './login.css';
import Header from './header';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toRegister: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        const target = event.target.name;
        this.setState({
            [target]: event.target.value
        });
    }

    handleClick(event) {
        if (event.target.id === "register") {
            this.setState({ toRegister: true });
        }
        else if (event.target.id === "login") {
            if (this.state.email.includes("@")) {
                const login = fBase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                login.catch(e => console.log(e.message));
            }
            else {
                // TODO: Show client this message
                console.log("invalid email");
            }
        }

        this.setState({
            email: '',
            password: ''
        });
        event.preventDefault();
    }

    render() {
        if (this.state.toRegister) {
            return (<RegistrationForm />);
        }
        else {
            return (
                <div>
                    <Header />
                    <form className="loginRegisterForm">
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <button 
                            className="defaultButton" 
                            id="login" 
                            onClick={this.handleClick}
                        >Login</button>
                        <button
                            className="defaultButton"
                            id="register" 
                            onClick={this.handleClick}
                        >Register</button>
                    </form>
                </div>
            );
        }
    }
}

export default LoginForm;