import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import firebase from "firebase";
import User from "../User/User"

/**************************************************************
 *                                                            *
 *  Additional Feature                                        *
 *  Sidebar
 *      - General chat area for all users
 *      - List of users
 *      - Search list of users
 *                                                            *
 **************************************************************/

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
        this.userRef = firebase.database().ref().child(this.props.group + '/users');
    }
    componentDidMount(){
        this.listenUsers();
    }
    handleSignOut() {
        firebase.auth().signOut();
    }
    handleChange(event) {
        const search = event.target.value;
        this.userRef
            .on('value', users => {
                if (users.val() !== null)
                    this.setState({
                        users: Object.values(users.val())
                            .filter((u) => {
                                if (search === '')
                                    return true;
                                console.log(u);
                                const username = u.username.toLowerCase();
                                return username.includes(search.toLowerCase());
                            })
                            .map((current, index) => {
                                current['key'] = Object.keys(users.val())[index];
                                return current
                            })
                    });
            });
    }
    handleGeneral(){
        this.props.changeChatroom('general')
    }
    handleChatroomChange(other){
        const curUser = this.props.user.uid;
        let path = '';
        if(other.key > curUser) {
            path = other.key + '-' + curUser;
        } else {
            path = curUser + '-' + other.key
        }

        other['path'] = path;
        this.props.changeChatroom(other)
    }
    listenUsers() {
        this.userRef
            .limitToFirst(20)
            .on('value', users => {
                if (users.val() !== null)
                    this.setState({
                        users: Object.values(users.val())
                            .map((current, index) => {
                                current['key'] = Object.keys(users.val())[index];
                                return current
                            })
                    });
            });
    }
    render() {
        return (
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h3>Chat Away</h3>
                </div>
                <div className="sidebar-chats">
                    <div className="header">
                        <h5>Chat rooms</h5>
                    </div>
                    <a href="#general" onClick={this.handleGeneral.bind(this)}>General</a>
                </div>
                <div className="sidebar-users">
                    <div className="header">
                        <h5>Users</h5>
                    </div>
                    <input className="user-search" type="text" placeholder="  Search for user..." value={this.state.userSearch}
                           onChange={this.handleChange.bind(this)}/>
                    <ul className="users-list">
                        { this.state.users
                            .filter((item) => item.username !== this.props.user.username)
                            .map((item) => <User startChat={this.handleChatroomChange.bind(this)} user={item} key={item.key}/>)
                        }
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <span>{this.props.user.username}</span>
                    <a id="sidebar-logout" href="#logout" onClick={this.handleSignOut.bind(this)}>Logout</a>
                </div>

            </nav>
        );
    }
}