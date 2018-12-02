/***
 * Name: Message.js
 *
 * Description: - Structure of a message.
 *              - Display avatar.
 *              - Line to determine if it's the user's own message.
 *              - User's name.
 *              - Time sent.
 *              - Message content.
 **/

import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

const isOwnUserMessage = (message, user) => {

    // Used to display the line to show the user's own messages.
    return message.user.id === user.uid ? 'messageSelf' : '';

};

// Conver the timestamp to display for the message on the current moment.
const timeCheck = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (

    <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={isOwnUserMessage(message, user)}>
            <Comment.Author as="a">{ message.user.name }</Comment.Author>
            <Comment.Metadata>{ timeCheck(message.timestamp) }</Comment.Metadata>
            <Comment.Text>{ message.content }</Comment.Text>
        </Comment.Content>
    </Comment>
);

export default Message;