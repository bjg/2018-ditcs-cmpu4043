import React, { Component } from 'react';
import fireBase from '../config/fireBase';
import Message from './Message';

class MessageList extends Component 
{
    constructor(props) 
	{
        super(props);
        this.state = 
		{
            messageIDs: []
        }
    }

    componentDidMount() {
        fireBase.database().ref('messages/').on('value', snapshot => 
		{
            let allMessages = [];
            snapshot.forEach(element => 
			{
                allMessages.push(element.key)
            })
            this.setState({ 
				messageIDs: allMessages 
			});
        })
    }

    render() {
        return this.state.messageIDs.map(id => 
		(
                <Message messageID={id} />
            )
        )
    }
}

export default MessageList;