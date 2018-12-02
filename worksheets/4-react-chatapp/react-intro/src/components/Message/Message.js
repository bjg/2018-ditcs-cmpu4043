import React, {Component} from 'react';
import './Message.css';

import firebase from 'firebase';


export default class Message extends Component {
    handleSend() {
        firebase.database().ref('messages').child(this.props.message.uniqueKey).remove();
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
    selectUser()
    {
        if(this.props.message.userName === this.props.currentUser)
        {
            return(
                <span className="message__author">
                    {this.props.message.userName}
                </span>
            )

        }
        else
        {
            return(
                <button
                    className="user__button"
                    onClick={this.openGroupChat.bind(this)}
                >
                    {this.props.message.userName}
                </button>
            )
        }
    }
    openGroupChat()
    {
        if (typeof this.props.openGroupChat === 'function') {
            this.props.openGroupChat(this.props.message.userName);
        }
    }
    // testif()
    // {
    //     if(false)
    //     {
    //         return(<div>iftrue</div>)
    //     }
    // }
    render() {
        return (
            <div className="message">
                {this.selectUser()}
                :
                {/*<button*/}
                    {/*className="user__button"*/}
                    {/*onClick={this.openGroupChat.bind(this)}*/}
                {/*>*/}
                    {/*{this.props.message.userName}:*/}
                {/*</button>*/}
                {/*<span className="message__author">*/}
                    {/*{this.props.message.userName}:*/}
                {/*</span>*/}
                {this.props.message.message}

                {this.optionIfAuthor()}

                {/*{this.testif()}*/}
                {/*<div>functionValue</div>*/}
            </div>
        )
    }
}