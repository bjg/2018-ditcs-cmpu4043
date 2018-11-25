import React, { Component } from 'react';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class Message extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        // Figure out if it is a message from the person logged in or not
        if(this.props.currentlySelectedUser == this.props.message.from) {
            return (
                <div>
                    <div class="float-left">
                        <div className="from-message">
                            {this.props.message.body}
                        </div>
                        <div className="float-left"><small><i className="fa fa-clock-o"></i> {this.props.message.sentAt}</small></div>
                    </div>
                    <br /><br />
                </div>
            )
        } else {
            return (
                <div>
                    <div className="float-right">
                        <div className="to-message">
                            {this.props.message.body}
                        </div>
                        <div className="float-right"><small><i className="fa fa-clock-o"></i> {this.props.message.sentAt}</small></div>
                    </div>
                    <br/><br/>
                </div>
            )
        }
    }
}

export default Message