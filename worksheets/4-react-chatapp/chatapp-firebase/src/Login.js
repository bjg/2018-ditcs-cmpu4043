import React, { Component } from 'react';
import fireBase from './config/fireBase';
import RegisterForm from './Register';
import './Login.css';
import Header from './Header/Header';

class LoginForm extends Component 
{
    constructor(props) 
	{
        super(props);
        this.state = 
		{
            email: '',
            password: '',
            toRegister: false
        }
        this.change = this.change.bind(this);
        this.click = this.click.bind(this);
    }

	change(event) 
	{
        const target = event.target.name;
        this.setState({
            [target]: event.target.value
        });
    }

    click(event) 
	{
        if (event.target.id === "register") 
		{
            this.setState({ toRegister: true });
        }
        else if (event.target.id === "login") 
		{
            if (this.state.email.includes("@")) 
			{
                const login = fireBase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                login.catch(e => console.log(e.message));
            }
            else 
			{
				console.log("invalid email");
            }
        }

        this.setState({
            email: '',
            password: ''
        });
        event.preventDefault();
    }

    render() 
	{
        if (this.state.toRegister) 
		{
            return (<RegisterForm />);
        }
        else {
            return (
                <div>
                    <Header />
                    <form className="login_reg_Form">
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
                            id="login" 
                            onClick={this.click}
                        >Login</button>
                        <button
                            className="defaultButton"
                            id="register" 
                            onClick={this.click}
                        >Register</button>
                    </form>
                </div>
            );
        }
    }
}

export default LoginForm;