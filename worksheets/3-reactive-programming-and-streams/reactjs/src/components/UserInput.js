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
          user: props.user,
          message: '',
          listOfMessages: [],
          userName:''
        };

       


        this.chatRoomsRef = firebase.database().ref().child('chatrooms');
        //this.chatRoomsRef = firebase.database().ref().child('messages');

        this.deleteMessages = this.deleteMessages.bind(this);
 
        //this.chatRoomNumber = Math.floor(Math.random() * 1000); 
        this.chatRoomNumber = 10;
        this.chatRoomNumRef = this.chatRoomsRef.child(this.chatRoomNumber);
        this.usersRef = this.chatRoomsRef.child(this.chatRoomNumber).child('users');


        this.displayNewMessages();

    }

    componentDidMount(){
        let email = this.state.user;
        //console.log(email);
        //this will be null if you refresh the page with out logging out
        if(email === null){
            console.log("TODO: log out to fix null email")
        }
        else{
            let userNameParsed = email.substring(0, email.indexOf("@"));
            //onsole.log(userName);
            this.setState({
                userName:userNameParsed
            })
        }

    }

    sendMessage(){
        //if there is a message to put in database
        console.log("userName:" + this.state.userName);
        if (this.state.message) {
            let userRef = this.chatRoomNumRef.child('/users').child(this.state.userName);
            let newMessageRef = userRef.push();

            newMessageRef.set({
                message: this.state.message
            })

            this.setState({ message: '' });
          }
    }

    /*START HERE! NOTE DISPLAYING*/
    displayNewMessages() {
         /*
         this.chatRoomNumRef.child('users').on('value',snapshot => {
            snapshot.forEach(function(userSnapshot){
                //console.log(userSnapshot.key +": " + userSnapshot.val());
                userSnapshot.forEach(function(messageSnapshot){
                    //console.log(messageSnapshot.val());
                    let msgRef = messageSnapshot.child('message');
                    console.log(msgRef.val());
                    this.setState({ listOfMessages: [...this.state.listOfMessages, 'new value'] }) 
 
                })
            });
         });
         */
        let messageFromDB = {
            
        }
        this.usersRef.on('value',userSnapshot =>{
            //console.log(userSnapshot.key);
            userSnapshot.forEach(messageSnapshot =>{
                messageSnapshot.forEach(message =>{
                    console.log(message.val());
                    this.setState({
                        listOfMessages: this.state.listOfMessages.concat([message.val().message])
                        //listOfMessages: Object.values(message.val()),

                    })
                })
            })
        })

        
    }
            

    onTextInput(ev){
        this.setState({message: event.target.value});
        //console.log(this.state.message);
    }


    
    deleteMessages(event){
        let messageKeysFromUser = [];

        let userNameFromState = this.state.user;

        
        //get ids for each entry by a user(email), put them in an array so they can be deleted
        this.chatRoomsRef.on('value', function (messagesSnapshot) {
            messagesSnapshot.forEach(function(message){

                let messageEntry = message.val();
                console.log(messageEntry);
                
                if(messageEntry.userName === userNameFromState){
                    messageKeysFromUser.push(message.key);
                    //console.log(message.key);
                    //console.log(messageEntry.message);
                    //console.log(messageEntry.userName);

                }
            })
        });
        for(let i = 0; i < messageKeysFromUser.length; i++){
            console.log(messageKeysFromUser[i]);   
            this.chatRoomsRef.child(messageKeysFromUser[i]).remove();     
        }
    }
    
    render(){
        return(
            <div>
                <div>
                {   
                    this.state.listOfMessages.map((item, index) =>
                        <Message key={index} messageFromDB={item} />
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
