import React, { Component } from 'react';
import ChatEnv from './ChatEnv';
import LoginForm from './Login';
import fireBase from './config/fireBase';
import './App.css';

class App extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{ 
			loggedIn: false, 
		};
		this.authListener = this.authListener.bind(this);
	}

	componentDidMount()
	{
		this.authListener();
	}

	authListener() 
	{
		fireBase.auth().onAuthStateChanged(fbaseUser => 
		{
			if (fbaseUser) 
			{
				this.setState({ loggedIn: true });
			}
			else 
			{
				this.setState({ loggedIn: false });
			}
		})
	}

	render() 
	{
		if (this.state.loggedIn) 
		{
			return (<ChatEnv />);
		}
		else 
		{
			return (<LoginForm />);
		}
	}
}

export default App;