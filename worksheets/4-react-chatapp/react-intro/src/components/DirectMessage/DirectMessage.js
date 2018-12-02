import React, {Component} from 'react';
import './DirectMessage.css';
import firebase from 'firebase';

export default class DirectMessage extends Component {
    handleSend() {
        firebase.database().ref('directPair/' + this.props.chatKey).child(this.props.message.uniqueKey).remove();
    }
    optionIfAuthor()
    {
        if(this.props.message.userName === this.props.currentUser)
        {
            return(
                <button
                    className="message__button"
                    onClick={this.handleSend.bind(this)}
                >
                    delete
                </button>
            )
        }
    }
    render() {
        return (
            <div className="message">
                <span className="message__author">
                    {this.props.message.userName}:
                </span>
                {this.props.message.message}

                {this.optionIfAuthor()}
            </div>
        )
    }
}