import React from 'react';
import fBase from '.././config/fBase';
import './message.css';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
            sender: '', 
            senderUID: ''
        }
        this.getSenderUID = this.getSenderUID.bind(this);
        this.getSender = this.getSender.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var id = this.props.messageID;
        fBase.database().ref('messages/').child(id).once('value', snapshot => {
            var message = snapshot.val();
            this.setState({ 
                messageText: message.message,
                sender: message.name,
                senderUID: message.UID
            });
        })
    }

    getSenderUID() {
        return this.state.senderUID;
    }

    getSender() {
        return this.state.sender;
    }

    getMessage() {
        return this.state.messageText;
    }

    handleDelete() {
        fBase.database().ref('messages/').child(this.props.messageID).remove();
    }

    render() {
        let user = fBase.auth().currentUser;
        if (user.uid === this.getSenderUID()) {
            return (
                <div className="message">
                    <div className="right">
                        <p className="nameRight">You</p>
                        <span className="deleteRight">
                            <button id="del" onClick={this.handleDelete}>X</button>
                        </span>
                        <p className="messageRight">{this.getMessage()}</p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="message">
                    <div className="left">
                        <p className="nameLeft">{this.getSender()}</p>
                        <p className="messageLeft">{this.getMessage()}</p>
                    </div>
                </div>
            )
        }
        
    }
}

export default Message;