import React from "react";
import PropTypes from 'prop-types';
import { Message } from './components/Message';
import firebase from 'firebase';


export class UserInput extends React.Component{  
    constructor(props) {
        super(props);
        this.state = {
          user: '',
          message: '',
          listOfMessages: [],
        };

        this.messageRef = firebase.database().ref().child('messages');
        this.displayNewMessages();
    }

    sendMessage(){
        //if ther is a message to put in database
        if (this.state.message) {
            var newItem = {
              userName: this.state.user,
              message: this.state.message,
            }
            this.messageRef.push(newItem);
            this.setState({ message: '' });
          }
    }

    displayNewMessages() {
        this.messageRef
          .limitToLast(10)
          .on('value', message => {
            this.setState({
                listOfMessages: Object.values(message.val()),
            });
          });
    }

    onTextInput(ev){
        this.setState({message: event.target.value});
        console.log(this.state.message);
    }
    render(){
        return(
            <div>
                <div>
                {   
                    this.state.listOfMessages.map((item, index) =>
                        <Message key={index} message={item} />
                )}
                </div>
                <div>
                <input
                    className="form-group mx-sm-3 mb-2"
                    type="text"
                    placeholder="Type message"
                    onChange={this.onTextInput.bind(this)}
                    />

                <button className="btn btn-primary"onClick={this.sendMessage.bind(this)}>send</button>
                </div>
            </div>
        );
    }
}
