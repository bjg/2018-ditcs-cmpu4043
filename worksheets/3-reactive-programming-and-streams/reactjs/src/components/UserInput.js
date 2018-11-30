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
        //this.chatRoomsRef = firebase.database().ref().child('messages');

        this.deleteMessages = this.deleteMessages.bind(this);
 
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
        console.log("UserInput component");
        console.log(this.state);
    }
    
    
    componentDidUpdate(prevProps) {
        //console.log("did update");
    }

    sendMessage(){
        //if there is a message to put in database
        //console.log("userName:" + this.state.userName);
        if (this.state.message) {
            let userRef = this.chatRoomNumRef.child('/users').child(this.state.userName);
            let newMessageRef = userRef.push();

            newMessageRef.set({
                message: this.state.message
            })

            this.setState({ message: '' });
          }

          console.log("sendMessage()");
          console.log(this.state);
          console.log("---------------------------------------");
    }

    //Not working correctly: It will work until you log out and back in as another user then it will just keep displaying the last users last message
    //But it will still updatethe db correctly
    displayNewMessages() {


        this.usersRef.on('value',userSnapshot =>{
            //console.log(userSnapshot.key);
            userSnapshot.forEach(messageSnapshot =>{
                //console.log(messageSnapshot.key);
                messageSnapshot.forEach(message =>{
                    //console.log(message.val());

                    this.setState({
                        //listOfMessages: this.state.listOfMessages.concat([message.val().message])
                        //listOfMessages: Object.values(message.val()),
                        
                        listOfMessages: this.state.listOfMessages.concat({
                            userName: messageSnapshot.key,
                            message:message.val().message
                        }) 
                                           
                    })
                    
                })
            })
        })  
        console.log("displayMessages()");
        console.log(this.state);
        console.log("---------------------------------------");
    }
            

    onTextInput(ev){
        this.setState({message: event.target.value});
        //console.log(this.state.message);
    }


    
    deleteMessages(event){

        let userNameFromState = this.state.userName;
        
        let userNameRef = this.usersRef.child(userNameFromState);
        console.log(userNameRef.key);

        userNameRef.remove();

        //find a way to update the list array so it will re render with set state
        /*
       for(let i = 0;i < this.state.listOfMessages.length;i++){
            
        if(this.state.listOfMessages[i].userName = userNameRef.key){
            let newList = listOfMessages.splice(i, 1);
            console.log(this.state.listOfMessages[i]);
            this.setState({
                listOfMessages: newList
            })
        }
        */
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
