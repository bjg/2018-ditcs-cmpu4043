import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class Message extends Component {

    constructor(props) {
        super(props);
    }

    deleteMessage = event => {
        // Get a reference to that message
        const messageRef = this.props.firebase.message(event.currentTarget.value);
        // Remove it
        messageRef.remove();
    }

    render () {
        // Figure out if it is a message from the person logged in or not
        if(this.props.currentlySelectedUser == this.props.message.from) {
            // Figure out who the message is from
            const from = this.props.users.map(user => {
                if (this.props.currentlySelectedUser == user.uid) {
                    return user.username;
                }
            });
            return (
                <div>
                    <div class="float-left">
                        <br/>{from}
                        <div className="from-message">
                            {this.props.message.body}
                        </div>
                        <div className="float-left"><small><i className="fa fa-clock-o"></i> {this.props.message.sentAt}</small></div>
                    </div>
                    <br /><br />
                </div>
            )
        } else {

            // Check if the current logged in user is the one it is from. If it is then display it right
            if(this.props.loggedInAs == this.props.message.from) {
                // Figure out who the message is from
                const from = this.props.users.map(user => {
                    if (this.props.loggedInAs == user.uid) {
                        return user.username;
                    }
                });
                return (
                    <div>
                        <div className="float-right">
                            <br /><div className="float-right">{from}</div><br />
                            <div className="to-message">
                                {this.props.message.body}
                            </div>
                            <div className="float-right"><small><i className="fa fa-clock-o"></i> {this.props.message.sentAt} <button className="btn btn-secondary btn-sm" value={this.props.message.messageId} onClick={this.deleteMessage}><i className="fa fa-trash"></i></button></small></div>
                        </div>
                        <br /><br />
                    </div>
                )
            } else {
                // Figure out who the message is from
                const from = this.props.users.map(user => {
                    if (this.props.message.from == user.uid) {
                        return user.username;
                    }
                });
                return (
                    <div>
                        <div class="float-left">
                            <br />{from}
                            <div className="from-message">
                                {this.props.message.body}
                            </div>
                            <div className="float-left"><small><i className="fa fa-clock-o"></i> {this.props.message.sentAt}</small></div>
                        </div>
                        <br /><br />
                    </div>
                )
            }
        }
    }
}

export default withFirebase(Message)