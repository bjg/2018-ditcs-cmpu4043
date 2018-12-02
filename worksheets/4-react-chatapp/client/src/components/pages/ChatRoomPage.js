import React from 'react';
import firebase from '../../config/firebaseConfig'
import Messages from '../chatRoom/Messages'
import Sidebar from '../chatRoom/Sidebar'
import { connect} from 'react-redux'
import { Input } from 'semantic-ui-react'


class ChatRoomPage extends React.Component{
    state = {
        newMessage: '',
        roomMessages: [],
        chatBeingViewed: this.props.chatBeingViewed,
        uid:  this.props.uid,
        privateMessagesSent: [],
        privateMessagesReceived: [],
        currentPrivateMessageFiltered: [],
        currentRoomMessages: []
    }

    messageFieldChanged = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    }

    removeMessageFromChat = (chatName, messageID, permanentStateMessage, currentStateMessages) => {
        this.setState(() => ({
            //filter out the message that was delete and update state
            [permanentStateMessage]: this.state[permanentStateMessage].filter(message => {
                return message.id !== messageID
            })
        }))

        //if the delete was made from a room that the user is currently viewing then also update currentRoomMessages from state
        if (chatName === this.state.chatBeingViewed.chatName){
            this.setState(() => ({
                //filter out the message that was delete and update state
                [currentStateMessages]: this.state[currentStateMessages].filter(message => {
                    return message.id !== messageID
                })
            }))
        }
    }

    addMessageToChat = (message, messageID, permanentStateMessage, currentStateMessages) => {
        //store id as key to be used for deleting later
        message.id = messageID

        this.setState(previousState => ({
            [permanentStateMessage]: [...previousState[permanentStateMessage],  message]
        }))

        //if it current room is not a chat room that the user is viewing and the message it from someone that they have the chat open to
        if (!this.state.chatBeingViewed.isRoom && (message.to === this.state.chatBeingViewed.chatName || message.from === this.state.chatBeingViewed.chatName)){
            this.setState(previousState => ({
                [currentStateMessages]: [...previousState[currentStateMessages],  message]
            }))

        }else if (this.state.chatBeingViewed.isRoom && message.room === this.state.chatBeingViewed.chatName){
            this.setState(previousState => ({
                currentRoomMessages: [...previousState.currentRoomMessages,  message]
            }))
        }
    }

    componentDidMount(){
        let mainScope = this
        firebase.database().ref('roomMessages').on('child_added', snapshot => {
            mainScope.addMessageToChat(snapshot.val(), snapshot.key, 'roomMessages', 'currentRoomMessages')
        });

        //listen to any messages that is deleted from any of the group rooms
        firebase.database().ref('roomMessages').on('child_removed', snapshot => {
           mainScope.removeMessageFromChat(snapshot.val().room, snapshot.key, 'roomMessages', 'currentRoomMessages')
        });

        //listen to any new private messages
        firebase.database().ref('users').child(this.state.uid).child('privateMessagesSent').on('child_added', snapshot => {
            mainScope.addMessageToChat(snapshot.val(),  snapshot.key, 'privateMessagesSent', 'currentPrivateMessageFiltered')
        });

        //listen to any private messages that were sent out that the user removed
        firebase.database().ref('users').child(this.state.uid).child('privateMessagesSent').on('child_removed', snapshot => {
            mainScope.removeMessageFromChat(snapshot.val().to, snapshot.key, 'privateMessagesSent', 'currentPrivateMessageFiltered')
        });

        //listen to a any private messages that were received
        firebase.database().ref('users').child(this.state.uid).child('privateMessagesReceived').on('child_added', snapshot => {
            mainScope.addMessageToChat(snapshot.val(), snapshot.key, 'privateMessagesReceived', 'currentPrivateMessageFiltered')
        });

        //listen to any private received private message that were dellete
        firebase.database().ref('users').child(this.state.uid).child('privateMessagesReceived').on('child_removed', snapshot => {
            mainScope.removeMessageFromChat(snapshot.val().from, snapshot.key, 'privateMessagesReceived', 'currentPrivateMessageFiltered')
        });
    }

    sortMessages = (messages) => {
        return messages.sort(function(a, b) {
            if (a.timestamp <  b.timestamp) return -1;
            if (a.timestamp >  b.timestamp) return 1;
            return 0;
        });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chatBeingViewed.chatName !== this.state.chatBeingViewed.chatName){
            this.setState({
                chatBeingViewed: nextProps.chatBeingViewed,
            })

            //if the current that being viewed is a private chat
            if (!nextProps.chatBeingViewed.isRoom){

                //filter out all the private messages that were not send from the user that the chat is open on
                const receivedMessagesForCurrentChat = this.state.privateMessagesReceived.filter(message => {
                    return message.from === nextProps.chatBeingViewed.chatName
                })

                //filter out all private messages that were sent that was not sent to this user
                const sentMessagesForCurrentChat = this.state.privateMessagesSent.filter(message => {
                    return message.to === nextProps.chatBeingViewed.chatName
                })

                const sentAndReceived = receivedMessagesForCurrentChat.concat(sentMessagesForCurrentChat)

                //sort the messages by most recent
                const sentAndReceivedSorted = this.sortMessages(sentAndReceived)

                //set the current private messages to all the message from and to the current user that the chat is open on
                this.setState({
                    currentPrivateMessageFiltered: sentAndReceivedSorted,
                })
            }else {
                //get current messages for the room the user has open
                const currentRoomMessages = this.state.roomMessages.filter(message => {
                    return message.room === nextProps.chatBeingViewed.chatName
                })

                //sort the message by most recent
                const currentRoomMessagesSorted = this.sortMessages(currentRoomMessages)

                this.setState({
                    currentRoomMessages: currentRoomMessagesSorted,
                })
            }
        }
    }

    //generate a unique id, this is done because when a message is sent it is stored for both users, the one that sent it
    //and the one that received. They are both given the same id so that when the sender deletes the message, then the message
    //will be deleted from both users
    generateID = () => {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    postComment = (e) => {
        e.preventDefault()

        //if the current chat that is open then post the message to the corresponding room
        if (this.state.chatBeingViewed.isRoom){
            firebase.database().ref('roomMessages').push({
                message: this.state.newMessage,
                by: this.state.uid,
                timestamp: Date.now(),
                room: this.state.chatBeingViewed.chatName
            }).catch(err => console.log(err))

        }else {

            //generate id as to store the id for both sender and reciever so when we delete by id, it gets deleted from both sides
            const id = this.generateID()

            firebase.database().ref('users').child(this.state.uid).child('privateMessagesSent').child(id).set({
                message: this.state.newMessage,
                timestamp: Date.now(),
                to: this.state.chatBeingViewed.chatName,
                by: this.state.uid
            }).catch(err => console.log(err))

            firebase.database().ref('users').child(this.state.chatBeingViewed.chatName).child('privateMessagesReceived').child(id).set({
                message: this.state.newMessage,
                timestamp: Date.now(),
                from: this.state.uid,
                by: this.state.uid
            }).catch(err => console.log(err))
        }

        this.setState({
            newMessage: '',
        })
    }

    render() {
        const { newMessage, uid, currentPrivateMessageFiltered, currentRoomMessages } = this.state
        return (
            <div>
                <Sidebar/>

                <div style={{display: 'inline-block', padding: '20px'}}>

                    <h1>#{this.props.chatBeingViewed.chatName}</h1>
                    <Messages roomMessages={this.props.chatBeingViewed.isRoom ? currentRoomMessages : currentPrivateMessageFiltered} uid={uid} />
                    <div>
                        <form onSubmit={this.postComment}>
                            <Input
                                placeholder="Enter message"
                                value={newMessage}
                                onChange={this.messageFieldChanged}
                                style={{ width: 'calc(100vw - 300px)', marginLeft: '10px'}}
                            />
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        chatBeingViewed: state.chatBeingViewed
    }
}

export default connect(mapStateToProps)(ChatRoomPage)