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
            let userMessages = [];
            // This is the part of the lab that is the "Extra Credit Feature"
            // It filters messages based on groups and private messages.
            // The user can create groups with selected users in it.
            
            for(let i=0; i<this.state.messages.length; i++) {
                // Its a group that's selected
                console.log(this.props.currentlySelectedUser);
                if (this.props.currentlySelectedUser.startsWith('-LS')) {
                    if(this.props.currentlySelectedUser == this.state.messages[i].to) {
                        userMessages.push(this.state.messages[i]);
                    }
                } 
                // It's not a group
                else {
                    if ((this.state.messages[i].from == this.props.currentlySelectedUser && this.state.messages[i].to == this.props.loggedInAs) || (this.state.messages[i].to == this.props.currentlySelectedUser && this.state.messages[i].from == this.props.loggedInAs)) {
                        userMessages.push(this.state.messages[i]);
                    }
                }
            }
            // Everytime we re-render (when props change and when we change user, then we must filter that users messages out)

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