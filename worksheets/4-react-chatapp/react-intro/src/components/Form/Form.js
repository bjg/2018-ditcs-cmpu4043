import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import DirectForm from '../DirectForm/DirectForm';
import firebase from 'firebase';

function calculatePrivateChatName(userName1,userName2) {
    let array = [userName1,userName2].sort();
    return array[0] + "+" + array[1];
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: Math.random().toString(13).replace('0.', '') ,
            message: '',
            list: [],
            messageRef: firebase.database().ref('messages'),
            directChatTarget: null,
        };

        this.listenMessages();
    }

    directChatDisplay()
    {
        if(this.state.directChatTarget != null)
        {
            let privateChatName = calculatePrivateChatName(this.state.userName,this.state.directChatTarget)
            return(
                <DirectForm
                    currentUser={this.state.userName}
                    targetUser={this.state.directChatTarget}
                    chatKey={ privateChatName }
                />
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.directChatTarget !== this.state.directChatTarget) {
            this.setState({ activeDirectChat: this.directChatDisplay() });
        }
    }

    loadDirectForm(targetUserName) {
        this.setState({ directChatTarget: targetUserName });
        this.setState({ activeDirectChat: this.directChatDisplay() });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user) {
            this.setState({'userName': nextProps.user.displayName});
        }
    }
    handleChange(event) {
        this.setState({message: event.target.value});
    }
    handleSend() {
        if (this.state.message) {
            let newKey = this.state.messageRef.push().key;

            let updateItem = {
                userName: this.state.userName,
                message: this.state.message,
                uniqueKey: newKey,
            };

            this.state.messageRef.child(newKey).set(updateItem);

            this.setState({ message: '' });
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        this.state.messageRef
            .on('value', message => {
                if(message.val() != null)
                {
                    this.setState({
                        list: Object.values(message.val()),
                    });
                }
                else
                {
                    this.setState({
                        list: [],
                    });
                }
            });
    }
    render() {
        return (
            <div className="forms">
                <div className="form">
                    <h3>Your Username: {this.state.userName}</h3>
                    <h4>Group chat for all users</h4>
                    <div className="form__message">
                    { this.state.list.map((item, index) =>
                        <Message
                            key={index}
                            message={item}
                            currentUser={this.state.userName}
                            targetUser={this.state.directChatTarget}
                            openGroupChat={this.loadDirectForm.bind(this)}

                        />

                    )}
                    </div>
                    <div className="form__row">
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Type message"
                            value={this.state.message}
                            onChange={this.handleChange.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                        <button
                            className="form__button"
                            onClick={this.handleSend.bind(this)}
                        >
                        send
                        </button>
                    </div>
                </div>
                {this.directChatDisplay()}
            </div>
    );
    }
}