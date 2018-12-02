import React, { Component } from 'react';
import './DirectForm.css';
import firebase from 'firebase';
import DirectMessage from "../DirectMessage/DirectMessage";

export default class DirectForm extends Component {
    constructor(props) {
        super(props);

        let path = "directPair/" + this.props.chatKey;
        this.state = {
            userName: this.props.currentUser ,
            message: '',
            list: [],
            messageRef: firebase.database().ref( path ),
        };

        this.listenMessages();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.chatKey) {
            let path = "directPair/" + nextProps.chatKey;
            this.setState({
                userName: nextProps.currentUser ,
                message: '',
                list: [],
                messageRef: firebase.database().ref( path ),
            });
        }

        this.listenMessages();
    }
    handleChange(event) {
        this.setState({message: event.target.value});
    }
    handleSend() {
        if (this.state.message) {
            // var newItem = {
            //     userName: this.state.userName,
            //     message: this.state.message,
            // }
            let newKey = this.state.messageRef.push().key;

            let updateItem = {
                userName: this.state.userName,
                message: this.state.message,
                uniqueKey: newKey,
            }

            // this.getMessageRef().child(newKey).set(updateItem);
            this.state.messageRef.child(newKey).set(updateItem);

            this.setState({ message: '' });
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        this.state.messageRef
            .on('value', message => {
                if(message.val() != null)
                {
                    this.setState({
                        list: Object.values(message.val()),
                    });
                }
                else
                {
                    this.setState({
                        list: [],
                    });
                }
            });
    }
    render() {
        return (
            <div className="form">
                <h4>Private chat with: {this.props.targetUser}</h4>
                <div className="form__message">
                { this.state.list.map((item, index) =>
                        <DirectMessage key={index} message={item} currentUser={this.state.userName} chatKey={this.props.chatKey}/>
                )}
                </div>
                <div className="form__row">
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Type message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <button
                        className="form__button"
                        onClick={this.handleSend.bind(this)}
                    >
                    send
                    </button>
                </div>
            </div>
    );
    }
}