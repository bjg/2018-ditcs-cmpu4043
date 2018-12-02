/***
 * Name: MessagesPanel.js
 *
 * Description: - Improtant part of the display of Messages.
 *              - If messages sent in a private channel, store in a different part of database.
 *              - If messages sent in a public channel, store in a different part of database.
 *              - Smooth display of messages, auto scroll to end.
 *              - Functionality of searching for messages in here.
 **/

import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from '../../firebase';
import Message from './Message';

class MessagesPanel extends React.Component {

    state = {
        privateChannel: this.props.isPrivateChannel,
        privateMessagesRef: firebase.database().ref('privateMessages'),
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        uniqueUsers: '',
        searchMsg: '',
        isSearchLoading: false,
        resultsOfSearch: [],
        listeners: []
    };

    usersInChannel = messages => {

        const usersLoop = messages.reduce((accumlator, message) => {

            // If user not in, add the user into the accumlator.
            if (!accumlator.includes(message.user.name)) {

                accumlator.push(message.user.name);
            }

            return accumlator;

        }, []);

        // Check if more than one user.
        const isMoreThanOneUser = usersLoop.length > 1 || usersLoop.length === 0;

        // If only one user, don't incluse the "s", otherwise include it.
        const uniqueUsers = `${usersLoop.length} User${isMoreThanOneUser ? "s" : ""} in Channel`

        this.setState({ uniqueUsers });
    };

    // Which Ref to use when sending messages.
    // (Where to store the message in the database)
    getMessagesRef = () => {

        const { messagesRef, privateMessagesRef, privateChannel } = this.state;

        // If private channel, use privateMessagesRef, else use messagesRef
        return privateChannel ? privateMessagesRef : messagesRef;
    };

    addMessageListener = channelId => {

        // Array to be used to gather the messages.
        let loadedMessages = [];

        // Path to add messages to firebase.
        const ref = this.getMessagesRef();

        // Get the message based on the channel ID and listen for new child to be added.
        ref.child(channelId).on('child_added', snap => {

            // Add the snap value to the loaded messages array.
            loadedMessages.push(snap.val());

            //console.log(loadedMessages);

            // Put these messages within state.
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });

            this.usersInChannel(loadedMessages);

        });
        this.addToListeners(channelId, ref, 'child_added');

    };

    addListeners = channelId => {

        this.addMessageListener(channelId);
    };

    // Listner to display the messages on screen.
    componentDidMount() {

        const { channel, user, listeners } = this.state;

        // If the channel and user exist for the message.
        if (channel && user) {

            this.removeListeners(listeners);

            // Pass down the current channel the user is on.
            this.addListeners(channel.id);
        }
    };

    removeListeners = listeners => {

        listeners.forEach(listener => {
            
            listener.ref.child(listener.id).off(listener.event);
        })
    };

    componentWillUnmount() {

        this.removeListeners(this.state.listeners);
    };

    addToListeners = (id, ref, event) => {

        const index = this.state.listeners.findIndex(listeners => {

            return listeners.id === id && listeners.ref === ref && listeners.event === event;
        });

        // If no index found for an element.
        if (index === -1) {

            const newListener = { id, ref, event };

            this.setState({ listeners: this.state.listeners.concat(newListener) });
        }
    };

    // Take in messages array
    displayMessages = messages => (

        // Check to see if we values are present, if so iterate using map.
        messages.length > 0 && messages.map(message => (

            // For each message, output it using the values below.
            <Message 
                key={message.timestamp} // Key for iteration
                message={message} // Pass down the full message object
                user={this.state.user} // Pass down the user from state object
            />
        ))
    );

    // Handle the search of messages.
    handleSearchingMessages = () => {

        // Grab the whole messages contents in a channel.
        const messagesInChannel = [...this.state.messages];
        
        // Global, match all instances of the pattern in a string and case-insensitive.
        const regex = new RegExp(this.state.searchMsg, 'gi');

        const resultsOfSearch = messagesInChannel.reduce((accumlator, message) => {

            if ( (message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                accumlator.push(message);
            }

            return accumlator;

        }, []);

        this.setState({ resultsOfSearch });

        // Loading wheel for searching, set to 1 second.
        setTimeout(() => this.setState({ isSearchLoading: false }), 1000);
    };

    // Searching process.
    handleSearch = event => {

        // Set state to searching for a message
        this.setState({
            searchMsg: event.target.value,
            isSearchLoading: true

        }, () => this.handleSearchingMessages());
    };

    // Display the name of the channel in the channel header.
    nameOfChannelDisplay = channel => {

        // If it is a private channel add the @ symbol else add # and add the channel name.
        return channel ? `${this.state.privateChannel ? '@ ' : '# '}${channel.name}` : '';
    };

    // Lifecycle method to check if component updates.
    componentDidUpdate() {

        // If updates and has a ref.
        if (this.messagesEnd) {

            this.ScrollToBottom();
        }
    };

    // Function to scroll to the bottom.
    ScrollToBottom = () => {

        // Smooth scroll when new message is in.
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    };

    render() {

        const { messagesRef, messages, channel, user, 
                uniqueUsers, searchMsg, resultsOfSearch, 
                isSearchLoading, privateChannel } = this.state;

        return (

            <React.Fragment>

                <MessagesHeader
                    channelName={this.nameOfChannelDisplay(channel)}
                    uniqueUsers={uniqueUsers}
                    handleSearch={this.handleSearch}
                    isSearchLoading={isSearchLoading}
                    isPrivateChannel={privateChannel}
                />

                <Segment>
                    <Comment.Group className="messages">

                        {/* Messages */}
                        { searchMsg ? this.displayMessages(resultsOfSearch) : this.displayMessages(messages)}

                        {/* Auto Scroll to End */}
                        <div ref={node => (this.messagesEnd = node)}></div>

                    </Comment.Group>
                </Segment>

                <MessageForm 
                    messagesRef={ messagesRef }
                    currentChannel={ channel }
                    currentUser={ user }
                    isPrivateChannel={ privateChannel }
                    getMessagesRef={ this.getMessagesRef }
                >
                </MessageForm>

            </React.Fragment>
        );
    }
}

export default MessagesPanel;