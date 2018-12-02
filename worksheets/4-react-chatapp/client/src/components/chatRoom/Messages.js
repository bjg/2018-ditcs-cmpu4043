import React from 'react';
import { Segment } from 'semantic-ui-react'
import {connect} from "react-redux";
import firebase from '../../config/firebaseConfig'
import { Button } from 'semantic-ui-react'

class Messages extends React.Component {
    deletePost = (message) => {
        //only delete if users id is the same as the person who posted the comment
        //only creators can see delete button but just extra check
        if (message.by === this.props.uid){

            if (this.props.chatBeingViewed.isRoom){
                firebase.database().ref('roomMessages').child(message.id).remove();
            }else {
                firebase.database().ref('users').child(this.props.uid).child('privateMessagesSent').child(message.id).remove(); //delete from sender
                firebase.database().ref('users').child(message.to).child('privateMessagesReceived').child(message.id).remove(); //delete from receiver
            }
        }
    }

        render() {
            const {roomMessages, uid} =this.props
            const deletePost = this.deletePost

            const timeConverter = (UNIX_timestamp) => {
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var time = date + ' ' + month + ' ' + hour + ':' + min;
                return time;
            }

            const messagesList = roomMessages.map(function(message, index) {
                return (
                    <div key={index} style={{padding: '5px'}}>
                        <p style={{fontWeight: 'bold', marginBottom: 0}}>{message.by}</p>
                        <p style={{marginTop: 0, marginBottom: 0}}>{message.message}</p>
                        <p style={{marginTop: 0, marginBottom: 0, fontSize: '12px', color: 'grey'}}>{timeConverter(message.timestamp)}</p>
                        {
                            message.by === uid ? (
                                <Button negative style={{height: '20px', fontSize: '10px', margin: 0, padding: 5}}
                                        onClick={() => deletePost(message)}>Delete</Button>) : null
                        }
                    </div>
                )
            })

            return (
                <Segment raised style={{height: 'calc(100vh - 150px)', margin: 10, width: 'calc(100vw - 300px)', overflowY: 'scroll'}}>
                    {messagesList.length > 0 ? messagesList:
                        <div>
                            <p>No messages... <br/> Starting a conversation.</p>
                        </div>
                    }
                </Segment>
            )
        }
    }

    const mapStateToProps = (state) => {
    return {
        uid: state.uid,
        chatBeingViewed: state.chatBeingViewed
    }
}

export default connect(mapStateToProps)(Messages)

