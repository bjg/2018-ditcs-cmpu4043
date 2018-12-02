import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';
import Sidebar from '../Sidebar/Sidebar';
import ChatRoom from '../ChatRoom/ChatRoom'
import firebase from 'firebase';

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: firebase.auth().currentUser,
            path: 'general',
            otherUser: null
        };
    }
    handleChatroomChange(data){
        if (data !== 'general'){
            this.setState({
                otherUser: data,
                path: data.path
            });
        } else {
            this.setState({
                otherUser: null,
                path: data
            });
        }
    }
    render() {
        if(!firebase.auth().currentUser) {
            return (
                <Redirect to='/login'/>
            )
        }
        return (
            <div className="chat">
                <Sidebar user={this.props.user} group={this.props.group} changeChatroom={this.handleChatroomChange.bind(this)}/>
                <ChatRoom group={this.props.group} user={this.props.user} otherUser={this.state.otherUser} path={this.state.path} />
            </div>
        );
    }
}