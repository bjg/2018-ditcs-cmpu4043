/***
 * Name: MessageForm.js
 *
 * Description: - The Message Form.
 *              - Field for the user to enter the message.
 *              - Ability to send the message when the Message button is pressed.
 **/

import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';

class MessageForm extends React.Component {

    state = {
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: []
    };

    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    };

    // Function that creates the message with fields in it.
    createMessage = () => {

        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
            content: this.state.message
        };

        return message;
    };

    // Handle when a user sends a message.
    sendMessage = () => {

        // Destructure from props the messages reference.
        const { getMessagesRef } = this.props;

        // Destructure from state the message property.
        const { message, channel } = this.state;

        // Check to see if there is a message, then send it.
        if (message) {

            this.setState({ loading: true });

            getMessagesRef()
                .child(channel.id) // Specify the channel the message is added to.
                .push()
                .set(this.createMessage())
                .then(() =>  {
                    this.setState({ loading: false, message: '', errors: [] })
                })
                .catch(e => {
                    console.error(e);

                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(e)
                    })
                })

        } else {

            this.setState({

                errors: this.state.errors.concat({ message: 'You must type something to send...' })
            });
        }

    };

    render() {

        const { errors, message, loading } = this.state;

        return(

            <Segment className="messageForm">

            <Input 
                fluid 
                name="message"
                onChange={ this.handleChange }
                value= { message }
                style={{ marginBottom: '1em' }} 
                labelPosition="left"
                className={ errors.some(e => e.message.includes('message')) ? 'error' : '' }
                placeholder="Type your message" 
                
            />

            <Button.Group icon widths="2">

                {/* Button to reply back to a message */ }
                <Button 
                    onClick={ this.sendMessage }
                    disabled={ loading }
                    color="green"
                    content="Message"
                    labelPosition="left"
                    icon="edit"
                />

            </Button.Group>
            
            
            </Segment>


        )
    };
}

export default MessageForm;