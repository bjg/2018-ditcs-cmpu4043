import React from 'react';
import fBase from '../config/fBase';
import Message from './message';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageIDs: []
        }
    }

    componentDidMount() {
        fBase.database().ref('messages/').on('value', snapshot => {
            let allMessages = [];
            snapshot.forEach(element => {
                allMessages.push(element.key)
            })
            this.setState({ messageIDs: allMessages });
        })
    }

    render() {
        return this.state.messageIDs.map(id => (
                <Message messageID={id} />
            )
        )
    }
}

export default MessageList;