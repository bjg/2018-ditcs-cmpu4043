import React from 'react';
import * as firebase from 'firebase';

class Message extends React.Component {

    deleteMessage = (messageId) => {
        firebase.database().ref('messages').child(messageId).remove()
    }

    render() {

        const props = this.props
        const { user, chat, index } = this.props

        return (
            <li id={index} className={`chat ${user === chat.username ? "right" : "left"}`}>
                {chat.message + '   '}
                {user === chat.username
                && <button style={{backgroundColor: 'transparent', border: '0px', outline: 'none', cursor: 'pointer'}} onClick={() => this.deleteMessage(chat.id)}>x</button>
                }
            </li>
        )
    }
}

export default Message;