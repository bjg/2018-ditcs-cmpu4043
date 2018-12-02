import React from "react";
import PropTypes from 'prop-types';
import { Message } from './Message';
import firebase from 'firebase';
import { runInThisContext } from "vm";


export class UserInput extends React.Component{ 
    //NOTE: If you refresh the page and dont log out and log back in this state doesnt work for deleting 
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          message: '',
          listOfMessages:[],
          userName:null
        };
        

        this.chatRoomsRef = firebase.database().ref().child('chatrooms');

        this.deleteMessages = this.deleteMessages.bind(this);
 
        //Set chat room
        //this.chatRoomNumber = Math.floor(Math.random() * 1000); 
        this.chatRoomNumber = 10;
        this.chatRoomNumRef = this.chatRoomsRef.child(this.chatRoomNumber);
        this.usersRef = this.chatRoomsRef.child(this.chatRoomNumber).child('users');


        this.displayNewMessages();

    }

    
    componentDidMount(){
        this.setState({
            user: this.props.user,
            userName:this.props.userName
        })
    }
    
    sendMessage(){
        //if there is a message to put in database
        if (this.state.message) {
            let userRef = this.chatRoomNumRef.child('/users').child(this.state.userName);
            let newMessageRef = userRef.push();

            newMessageRef.set({
                message: this.state.message
            })

            this.setState({ message: '' });
          }
    }

    //Not working correctly: It will work until you log out and back in as another user then it will just keep displaying the last users last message
    //But it will still update the db correctly
    displayNewMessages() {


        this.usersRef.on('value',userSnapshot =>{
            userSnapshot.forEach(messageSnapshot =>{
                messageSnapshot.forEach(message =>{
                    this.setState({                        
                        listOfMessages: this.state.listOfMessages.concat({
                            userName: messageSnapshot.key,
                            message:message.val().message
                        }) 
                                           
                    })
                    
                })
            })
        })  
    }
            

    onTextInput(ev){
        this.setState({message: event.target.value});
    }


    
    deleteMessages(event){

        let userNameFromState = this.state.userName;
        
        let userNameRef = this.usersRef.child(userNameFromState);
        console.log(userNameRef.key);

        userNameRef.remove();
    }

    
    
    render(){
        return(
            <div>
                <div>
                {   
                    this.state.listOfMessages.map((item, index) =>
                        <Message key={index} messageFromDB={item}  />
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
                <button onClick={this.deleteMessages} className="btn btn-primary">Delete All My Messages</button>
                </div>

            </div>
        );
    }
}
