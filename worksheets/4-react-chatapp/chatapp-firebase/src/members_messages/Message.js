import React from 'react';
import fireBase from '.././config/fireBase';
import './Message.css';

class Message extends React.Component 
{
    constructor(props) 
	{
        super(props);
        this.state = 
		{
            msgText: '',
            sender: '', 
            senderID: ''
        }
        this.getSendID = this.getSendID.bind(this);
        this.getSender = this.getSender.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.msgDelete = this.msgDelete.bind(this);
    }

    componentDidMount() 
	{
        var id = this.props.messageID;
        fireBase.database().ref('messages/').child(id).once('value', snapshot => 
		{
            var message = snapshot.val();
            this.setState({ 
                msgText: message.message,
                sender: message.name,
                senderID: message.ID
            });
        })
    }

    getSendID() 
	{
        return this.state.senderID;
    }

    getSender() 
	{
        return this.state.sender;
    }

    getMessage() 
	{
        return this.state.msgText;
    }

    msgDelete() 
	{
        fireBase.database().ref('messages/').child(this.props.messageID).remove();
    }

    render() 
	{
        let user = fireBase.auth().currentUser;
        if (user.id === this.getSendID()) 
		{
            return (
                <div className="message">
                    <div className="right">
                        <p className="nameRight">You</p>
                        <span className="deleteRight">
                            <button id="del" onClick={this.msgDelete}>X</button>
                        </span>
                        <p className="messageRight">{this.getMessage()}</p>
                    </div>
                </div>
            )
        }
        else 
		{
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