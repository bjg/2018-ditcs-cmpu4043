import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import sha256 from 'js-sha256';

class ChatPage extends React.Component
{
	state = {
		userListItems: [],
		messagesListItems: [],
		signOutOpen: false,
		currentChat: 'global',
		currentUser: null,
		textbox: "",
		deleteOpen: false,
		clickedIndex: null,
		//this is the element in the message list that the user has clicked on, if it is null,
		//the list will scroll to the bottom, if not then the list will remain 'focused' on that message
		anchorEl: null,
		defaultImage: "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png",
		globeImage: "http://pngimg.com/uploads/globe/globe_PNG33.png"
	};

	//when the component is mounted, check the authorization for the user and load the users and the messages
  componentDidMount()
	{
		firebase.auth().onAuthStateChanged( (cUser) => {
		  if (cUser)
		  {
		  	let targetUser = null;
		  	let uid = null;

		  	const usersRef = firebase.database().ref('users/');
				usersRef.on('value', snap => {
				let userList = [];
				snap.forEach((user) =>
				{

					if (user.key === cUser.uid)
					{
						//if the user returned is the current user, the change its profile card to be the Global Chat
						uid = user.key;
						targetUser = user.val();
						userList.push({username: 'Global Chat', image: this.state.globeImage});
					}
					else
					{
						let userProfilePhoto = null

						//if the user does not have a profile picture then use the default profile picture
						user.val()['profilePicture'] === undefined ?  userProfilePhoto = this.state.defaultImage : userProfilePhoto = user.val()['profilePicture'];

						userList.push({username: user.val()['username'], userId: user.key, image: userProfilePhoto});
					}
		   		});

				//if the current signed in user's profile picture is undefined, then set it to the default profile picture
				if (targetUser.profilePicture === undefined)
				{
					this.setState({userListItems: userList, currentUser: {userId: uid, username: targetUser.username, profilePicture: this.state.defaultImage}});
				}
				else
				{
					this.setState({userListItems: userList, currentUser: {userId: uid, username: targetUser.username, profilePicture: targetUser.profilePicture}});
				}
			});

			//load messages
			const messagesRef = firebase.database().ref('messages/').child(this.state.currentChat);
			messagesRef.on('value', snap => {
				let messageList = [];
				snap.forEach( function(message)
				{
					//if the person who sent the message has no profile picture, then set it to the default image
					if (message.val()['sent_by'].profilePicture === undefined)
					{
						messageList.push({id: message.key, sent_by_username: message.val()['sent_by'].username, sent_by_id: message.val()['sent_by'].userId, text: message.val()['text'], image: this.state.defaultImage});
					}
					else
					{
		        		messageList.push({id: message.key, sent_by_username: message.val()['sent_by'].username, sent_by_id: message.val()['sent_by'].userId, text: message.val()['text'], image: message.val()['sent_by'].profilePicture});
					}
		   		});


		   		this.setState({messagesListItems: messageList});
			});

		  }
			// if user is not authenticated then sign user out
		  else
		  {
		  	this.signOut();
		  }
		});
	};

	//if the screen changes and the anchor element is null, then scroll to the bottom of them list
	componentDidUpdate()
	{
		if (this.state.anchorEl === null)
		{
			this.scrollToBottom();
		}
	};

	//sign out functionality, sign out user using google auth, then user the isLoggedHandler from App.js to log out the user
	//and brign them to the log in screen
	signOut = (event) => {
		let isLoggedHandler = this.props.isLoggedHandler;

		firebase.auth().signOut().then(function()
		{
		   localStorage.setItem('chatRoomLogged', '0');
		   isLoggedHandler('0');
		}).catch(function(error)
		{
	        let errorMessage = error.message;
	        alert(errorMessage);
		});
	};

	//change the sign out state in the application
	changeSignOutState = () =>
	{
		if (this.state.signOutOpen === false)
		{
			this.setState({signOutOpen: true});
		}
		else
		{
			this.setState({signOutOpen: false});
		}
	};

	//handle the delete of a message
	handleDelete = (event) => {

		//if the current user owns this message, then open the delete pop up
		if (this.state.currentUser.userId === event.currentTarget.getAttribute('ownedby'))
		{
			this.setState({
				deleteOpen: true,
				//set the anchor the current message
				anchorEl: event.currentTarget,
			});
		}
	};

	//close the delete pop up
	handleDeleteRequestClose = () => {
		this.setState({
			deleteOpen: false,
		});
	};

	//function for handling when a user enters a message
	sendMessage = (keyStroke) =>
	{
		//if the text input box is not empty, and the user has pressed the 'enter' key
		if (this.state.textbox !== "" && keyStroke.keyCode === 13)
		{
			firebase.database().ref('messages/').child(this.state.currentChat).push({sent_by: this.state.currentUser, text: this.state.textbox});

			//empty the text input box and set the anchor element to null, which will cause the message list to scroll to the latest message
			this.setState({textbox: "", anchorEl: null});
		}
	};

	//actually delete the mesage from the database
	deleteMessage = (event) =>
	{
		firebase.database().ref('messages/').child(this.state.currentChat).child(this.state.anchorEl.id).remove();

		this.setState({
			deleteOpen: false,
			anchorEl: null,
		});
	};

	//function to switch chats
	changeChat = (event) =>
	{
		let tempCurrChat = "";

		//if the user clicked has no ID, then its the global chat
		if (event.currentTarget.getAttribute('userid') === null)
		{
			tempCurrChat = "global";
		}
		else
		{
			//get the unique chat ID from the two userIds
			tempCurrChat = this.uniqueValueFromTwoStrings(event.currentTarget.getAttribute('userid'), this.state.currentUser.userId);
		}

		//get the messages from the two users
		const messagesRef = firebase.database().ref('messages/').child(tempCurrChat);
			messagesRef.on('value', snap => {
				let messageList = [];
				snap.forEach( function(message)
				{
		        	messageList.push({id: message.key, sent_by_username: message.val()['sent_by'].username, sent_by_id: message.val()['sent_by'].userId, text: message.val()['text'], image: message.val()['sent_by'].profilePicture});
		   		});

		   		this.setState({messagesListItems: messageList, currentChat: tempCurrChat});
			});
	};

	//function to create a unique ID that will be the same regardless of string order
	//this is because the messages between userA and userB will access the same node, but need to be able to calculate the node ID at runtime
	uniqueValueFromTwoStrings = (stringA, stringB) =>
	{
		//to create this ID, we use a hashing algorithm to hash both user IDs to avoid the possibility of creating a duplicate id
		let hashedA = sha256(stringA);
		let hasbedB = sha256(stringB);

		//string to store the final id
		let uniqueString = "";

		//loop through any hashed key, as the sha256 algorithm produces the same length string
		for (let i = 0; i < hashedA.length; i++)
		{
			//get char code of the char at index i, add them, then convert it to hexidecimal and concatonate it to the ID string
			//this creates a unique number based on their values, and converting it to hexidecimal is not really required, but a hex string adds a small extra layer of security to the ID
			uniqueString += (hashedA.charCodeAt(i) + hasbedB.charCodeAt(i)).toString(16);
		}

		return uniqueString;
	};

	//updates the state of the textbox when text has been entered by the user
	updateTextBox = (inputEvent) =>
	{
		this.setState({textbox: inputEvent.target.value});
	};

	scrollToBottom = () => {
	  this.refs.endOfMessages.scrollIntoView({ behavior: "auto" });
	}

	render(){
		//remove the background gif that was seen in the login screen
		document.body.style.backgroundImage = null;
    	document.body.style.backgroundSize = null;

    	//actions for the sign out dialog
		const signOutActions = [
	      <FlatButton
	        label="YES"
	        primary={true}
	        keyboardFocused={true}
	        onClick={this.signOut}
	      />,
	       <FlatButton
	        label="NOPE!"
	        primary={true}
	        keyboardFocused={true}
	        onClick={this.changeSignOutState}
	      />,
	    ]

	    return (
	    	<MuiThemeProvider>
		    	<AppBar
		          title='Welcome to the ChatRoom'
		          showMenuIconButton={false}
		          iconElementRight= {<IconButton onClick= {this.changeSignOutState}><ActionExitToApp/></IconButton>}
		        /><br/>

		        <Dialog
		            title="Are You Sure You Want to Sign Out?"
		            actions={signOutActions}
		            modal={false}
		            open={this.state.signOutOpen}>
		        </Dialog>

		       	<div style={{width: '100%'}} >
			        <div style={{display: 'inline-block', border: '2px solid grey', width: '30%', marginRight: '2%', verticalAlign: 'top', height: '80vh', overflow: 'auto'}}>
				        <List>
						  {
						  	//dynamically create the list of users
						  	this.state.userListItems.map(user =>
						  	<div>
							    <ListItem
							      userid= {user.userId}
							      primaryText={user.username}
							      leftAvatar={<Avatar src={user.image} />}
							      rightIcon={<CommunicationChatBubble />}
							      onClick= {this.changeChat}
							    />
							    <Divider />
							</div>
						  )}
						</List>
			        </div>

			        <div style={{display: 'inline-block', border: '2px solid grey', width: '65%', verticalAlign: 'top', height: '80vh'}}>
			        	<div ref= "globalMessages" style={{maxHeight: '65vh', height: '65vh', overflow: 'auto'}}>
				        	<List>
							  {
							  	//dynamically create the list of messages
							  	this.state.messagesListItems.map(message =>
								  	<div>
									    <ListItem
									    	id= {message.id}
									    	ownedby= {message.sent_by_id}
											onClick= {this.handleDelete}
											secondaryTextLines= {2}
										    primaryText={message.sent_by_username}
										    secondaryText={message.text}
										    leftAvatar={<Avatar src={message.image} />}
									    />
										<Popover
									        open={this.state.deleteOpen}
									        anchorEl={this.state.anchorEl}
									        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
									        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
									        onRequestClose={this.handleDeleteRequestClose}>
											<Menu>
												<MenuItem primaryText="Delete" onClick={this.deleteMessage}/>
											</Menu>
										</Popover>
									    <Divider />
									</div>
							  	)
							  }
							 <div ref='endOfMessages'>
						     </div>
							</List>
			        	</div>
			        	<div style={{width: '100%', height: '15%'}}>
				        	<div style={{margin: '1%', width: '89%', border: '2px solid lightgrey', borderRadius: '25px', display: 'inline-block', overflow: 'hidden'}}>
								<TextField
									value= {this.state.textbox}
									hintText="Enter a Message"
									style={{width: '95%', margin: '1%'}}
									onKeyDown={this.sendMessage}
									onChange={this.updateTextBox}
								/>
							</div>
						</div>
			        </div>
			    </div>
	        </MuiThemeProvider>
	    )
  }
}

export default ChatPage;
