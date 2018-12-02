import React, {Component} from 'react';
import './Message.css';
import firebase from "firebase";

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }
    componentDidMount() {
        let path = this.props.path;
        this.setState({
            path: this.props.group + '/chat/' + path + '/' + this.props.message.key
        });
        this.getUserName();
    }
    getUserName(){
        firebase.database().ref().child(this.props.group+'/users/'+this.props.message.uid)
        .on('value', snapshot => {
            this.setState({
                username: snapshot.val().username
            })
        });
    }
    handleDelete(){
        const messageRef = firebase.database().ref().child(this.state.path);
        messageRef.remove();
    }
    render() {
        console.log(this.props.username);
        console.log(this.state.username);
        return (
            <div className="row">
                <div className="col-3 text-left font-weight-bold">
                    {this.state.username}
                </div>
                <div className="col-1" >
                    { this.props.username === this.state.username &&
                        <button className="message-button" onClick={this.handleDelete.bind(this)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </button>
                    }
                </div>
                <span className="col-8 text-justify">
                    {this.props.message.message}
                </span>
            </div>
        )
    }
}