import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css';

export default class User extends Component {
    handlePrivateChat(user) {
        this.props.startChat(user);
    }
    render() {
        return (
            <li>
                <a href='#user' className="user" onClick={() => this.handlePrivateChat(this.props.user)}>{this.props.user.username}</a>
            </li>
        );
    }
}