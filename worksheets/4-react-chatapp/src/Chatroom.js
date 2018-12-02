import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as firebase from 'firebase';


import Message from './Message.js';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputMessage: '',
            uid: localStorage.lab_uid,
            chats: [

            ],
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
        const app = this
        firebase.database().ref('messages').on('child_added', (snapshot) => {
            const content = snapshot.val()
            content.id = snapshot.key
            const messages = app.state.chats
            messages.push(content)
            this.setState({ chats: messages })
        })


        firebase.database().ref('messages').on('child_removed', (snapshot) => {
            console.log('deleting')
            const id = snapshot.key
            let messages = app.state.chats
            const newMessages = messages.filter((message) => {
                return message.id !== id
            })
            this.setState({ chats: newMessages })
        })

    }

    componentDidUpdate() {
        this.scrollToBot();

    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();

        firebase.database().ref('messages').push({
            message: this.state.inputMessage,
            timestamp: Date.now(),
            room: 'main',
            username: this.state.uid
        })

        this.setState({
            inputMessage: '',
        })
    }

    messageInputChanged = (e) => {
        console.log(e.target.value)
        this.setState({
            inputMessage: e.target.value
        })
    }


    render() {
        const { chats, uid, inputMessage } = this.state;

        return (
            <div className="chatroom">
                <h3>ChittyChat</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat, index) =>
                            <Message chat={chat} user={uid} index={index}/>
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" onChange={this.messageInputChanged} value={inputMessage}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chatroom;