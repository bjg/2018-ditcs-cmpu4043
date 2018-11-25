import React, { Component } from 'react';
import '../../custom.css';

import { withFirebase } from '../Firebase';

import Message from '../Message';

const INITIAL_STATE = {
    message: '',
    messages: [],
    userMessages: []
}

class ChatWindow extends Component {

    constructor(props) {
        super(props);

        // Set the state to blank
        this.state = {...INITIAL_STATE};
    }

    // On change method for the form
    onChange = event => {
        // Set the state
        this.setState({ message: event.target.value });
    }

    sendMessage = event => {
        const { message } = this.state;
        
        // Send it to Firebase using "push" for unqiue ids
        var newMessageRef  = this.props.firebase.messages().push();

        // Set the message
        newMessageRef.set({
            from: this.props.loggedInAs,
            to: this.props.currentlySelectedUser,
            body: message,
            sentAt: new Date().toLocaleString()
        });

        this.setState({message: ''});

        // Don't refresh/don't let any event do anything.
        event.preventDefault();
    }

    componentDidMount() {
        this.setState({ loading: true });

        // Get the all of the messages from Firebase.
        this.props.firebase.messages().on('value', snapshot => {
            const messagesObject = snapshot.val();

            let messages = Object.keys(messagesObject).map(key => ({
                ...messagesObject[key],
                messageId: key
            }));

            this.setState({
                messages: messages
            });
        });
    }

    render () {
        if(this.props.currentlySelectedUser == 0) {
            return (
                <div className="col-md-8" style={{ marginLeft: '0px', paddingLeft: '0px' }}>
                <br/><br/>
                    <div className="text-center">
                        <h1>Please choose a user to chat to.</h1>
                    </div>
                </div>
            )
        } else {
            // Everytime we re-render (when props change and when we change user, then we must filter that users messages out)
            const userMessages = this.state.messages.filter(message => (message.from == this.props.currentlySelectedUser && message.to == this.props.loggedInAs) || (message.to == this.props.currentlySelectedUser && message.from == this.props.loggedInAs));

            return (
                <div className="col-md-8" style={{ marginLeft: '0px', paddingLeft: '0px' }}>
                    <div className="messages">
                        {
                            userMessages.map(message => (
                                <Message message={message} loggedInAs={this.props.loggedInAs} users={this.props.users} currentlySelectedUser={this.props.currentlySelectedUser}/>
                            ))
                        }
                    </div>
                    <div className="enterMessage">
                        <form onSubmit={this.sendMessage}>
                            <div className="form-group">
                                <textarea onChange={this.onChange} className="form-control" placeholder="Type a message..." value={this.state.message}></textarea>
                                <div className="submitMessageButton">
                                    <button type="submit" className="btn btn-success btn-block">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default withFirebase(ChatWindow);