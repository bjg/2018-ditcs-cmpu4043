import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatRoom.css';
import firebase from 'firebase';
import Message from '../Message/Message'
export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };
        this.messageRef = firebase.database().ref().child(this.props.group + '/chat/' + this.props.path);
    }
    componentDidMount(){
        this.listenMessages();
        this.scrollToBottom();
    }
    componentDidUpdate(){
        const path = this.props.path;
        const otherUser = this.props.otherUser;

        let header = 'General';
        if (otherUser !== null) {
            header = otherUser.username;
        }

        if(header !== this.state.header){
            this.setState({header: header, path: this.props.path});
            this.messageRef = firebase.database().ref().child(this.props.group + '/chat/' + path);
            this.listenMessages()
        }
        this.scrollToBottom();
    }
    handleChange(event) {
        this.setState({message: event.target.value});
    }
    handleSend() {
        if (this.state.message) {
            let newItem = {
                uid: this.props.user.uid,
                message: this.state.message
            };
            this.messageRef.push(newItem);
            this.setState({message: ''});
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        this.messageRef
            .limitToLast(50)
            .on('value', message => {
                if (message.val() !== null)
                    this.setState({
                        messages: Object.values(message.val()).map((current, index) => {
                            current['key'] = Object.keys(message.val())[index];
                            return current
                        })
                    });
                else
                    this.setState({messages: []})
            });
    }
    scrollToBottom() {
        this.scrollBottom.scrollIntoView({ behavior: "instant" });
    }
    render() {
        return (
            <div className="container chat-wrapper">
                <div className="row">
                    <div className="col-11 chat-header">
                        <h3>{this.state.header}</h3>
                    </div>
                </div>
                <div className="row messages">
                    <div className="container-fluid chat">
                        { this.state.messages.map((item) =>
                            <Message group={this.props.group} username={this.props.user.username} path={this.state.path} key={item.key} message={item}/>
                        )}
                        <div className="row" ref={(el) => {this.scrollBottom = el}}/>
                    </div>
                </div>
                <div className="row input">
                    <input className="col-10 input-field" type="text" placeholder="Type message" value={this.state.message}
                           onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <button className="col-1 send-button" onClick={this.handleSend.bind(this)}>
                        Send
                    </button>
                </div>
            </div>
        );
    }
}