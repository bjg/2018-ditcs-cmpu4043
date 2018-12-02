import React, { Component } from 'react';
import fireBase from './config/fireBase';
import LoginForm from './Login';
import Header from './Header/Header';
import './Login.css';

class RegisterForm extends Component 
{
    constructor(props) 
	{
        super(props);
        this.state = 
		{
            name: '',
            email: '',
            emailConfirm: '',
            password: '',
            passwordConfirm: '',
            successful: false
        }
        this.defaultState = this.state;
        this.change = this.change.bind(this);
        this.register = this.register.bind(this);
        this.authListener = this.authListener.bind(this);
    }

    reset() 
	{
        this.setState(this.defaultState);
    }

    change(event) 
	{
        const target = event.target.name;
        this.setState({
            [target]: event.target.value
        });
    }

    register(event) 
	{
		if // if user enters an email address that already exists
		{
            fireBase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch(e => 
				{
                    if (e.message !== "Another user already has this email address") 
					{
                        this.reset();
                        this.setState({ successful: true });
                    }
                    else
					{
                        console.log(e.message);
                    }
                });
            event.preventDefault();
        }
    }

    componentDidMount() 
	{
        this.authListener();
    }

    authListener()
	{
        fireBase.auth().onAuthStateChanged(firebaseUser => 
		{
            if (firebaseUser) 
			{
                fireBase.database().ref('users/' + firebaseUser.id).set({
                    email: firebaseUser.email,
                    name: this.state.name
                });
            }
        });
    }

	// display login form
    render() 
	{
        if (this.state.successful) 
		{
            return (<LoginForm />);
        }
        else {
            return (
                <div>
                    <Header />
                    <form className="login_reg_Form">
                        <input
                            className="loginInfo"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.change}
                        />
                        <input
                            className="loginInfo"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.change}
                        />
                
                        <input
                            className="loginInfo"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.change}
                        />
                     
                        <button
                            className="defaultButton"
                            id="register"
                            onClick={this.register}
                        >Register</button>
                    </form>
                </div>
            );
        }
    }
}

export default RegisterForm;