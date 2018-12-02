import React from 'react';
import MessageList from './components/messageList';
import fBase from './config/fBase';
import './chatEnv.css';
import MemberList from './components/memberList';

class ChatEnv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleLogout() {
        fBase.auth().signOut();
    }

    handleChange(event) {
        const target = event.target.name;
        this.setState({
            [target]: event.target.value
        });
    }

    handleSend(event) {
        let user = fBase.auth().currentUser;
        let messageContent = this.state.message;
        fBase.database().ref('/users/' + user.uid).once('value')
            .then(function(snapshot) {
                let name = snapshot.val().name;
                fBase.database().ref('messages/').push({
                    message: messageContent,
                    name: name,
                    UID: user.uid
                })
            });
        this.setState({ message: '' });
        event.preventDefault();
    }

    render() {
        return (
            <div id="chatScreen">
                <div id="members">
                    <pre>Chat Members</pre>
                    <button id="logout" onClick={this.handleLogout}>Logout</button>
                    <div id="memberList">
                        <MemberList />
                    </div>
                </div>
                <div id="textChat">
                    <div id="messages">
                        <MessageList />
                    </div>
                    <form id="send" onSubmit={this.handleSend}>
                        <input autoFocus
                            id="textInput"
                            type="text"
                            name="message"
                            placeholder="Enter Message"
                            value={this.state.message}
                            onChange={this.handleChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default ChatEnv;