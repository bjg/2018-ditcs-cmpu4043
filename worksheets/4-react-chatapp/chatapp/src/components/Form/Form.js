import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import firebase from 'firebase';
import Popup from 'reactjs-popup'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      message: '',
      list: [],
	  id: 0,
	  ref:'',
    };
    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.uid.substring(0,6)});
    }
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  handleSend() {
    if (this.state.message) {
      var newItem = {
		id: this.state.id++,
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }
  listenMessages() {
    this.messageRef
    .on('value', message => {
		if(message.val() !== null)
			this.setState({
				list: Object.values(message.val())
			})
        });
  }
  deleteMessage(item,e) {
	  var ref;
	  if(item.userName == this.state.userName){
		  if(window.confirm("Do you want to delete this message?")){
				this.messageRef.orderByChild("id").equalTo(item.id).on("value", function(snapshot) {
					snapshot.forEach(function(data) {
						ref = data.key;
					});
				});
				console.log(ref);
				firebase.database().ref().child('messages/' + ref).remove();
		  }
	  }else{
		  alert("You can't delete this message!")
	  }
  }
  render() {
    return (
      <div className="form">
        <div className="form__message">
          { this.state.list.map((item, index) =>
			<div key={item} onClick={this.deleteMessage.bind(this,item)}>
            <Message key={index} message={item}/>
			</div>
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
            className="form_button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
	</div>

    );
  }
}