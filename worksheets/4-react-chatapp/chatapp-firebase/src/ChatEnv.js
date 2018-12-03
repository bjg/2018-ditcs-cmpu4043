import React, { Component } from 'react';
import MessageList from './members_messages/MessagesList';
import fireBase from './config/fireBase';
import './ChatEnv.css';
import MemberList from './members_messages/MembersList';

class ChatEnv extends Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			message: '',
		}
		this.logout = this.logout.bind(this);
		this.change = this.change.bind(this);
		this.send = this.send.bind(this);
	}
	
	logout()
	{
		fireBase.auth().signOut();
	}

	change(event)
	{
		const target = event.target.name;
		this.setState({
			[target]: event.target.value
		});
	}
	
	send(event)
	{
		let user = fireBase.auth().currentUser;
		let msgContent = this.state.message;
		fireBase.database().ref('/users/' + user.id).once('value')
			.then(function(snapshot)
			{
				let name = snapshot.val().name;
				fireBase.database().ref('messages/').push({
					message: msgContent,
					name: name,
					ID: user.id
				})
			});
		this.setState({ message: '' });
		event.preventDefault();
	}
	
	
    render() {
        return (
            <div id="chatUI">
                <div id="members">
                    <pre>Group Members</pre>
                    <button id="logout" onClick={this.logout}>Logout</button>
                    <div id="membList">
                        <MemberList />
                    </div>
                </div>
                <div id="chatMessage">
                    <div id="messages">
                        <MessageList />
                    </div>
                    <form id="send" onSubmit={this.send}>
                        <input autoFocus
                            id="input"
                            type="text"
                            name="message"
                            placeholder="Enter Message"
                            value={this.state.message}
                            onChange={this.change}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default ChatEnv;