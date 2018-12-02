import React, { Component } from 'react'

class ChatAppMain extends Component {

	//State used to store messages
	constructor(props, context){
		super(props, context)
		
		//Function to update messages
		this.updateMessage = this.updateMessage.bind(this)
		//Function for button
		this.submitMessage = this.submitMessage.bind(this)
		this.state = {
			message: '',
			//Current messages array
			messages: []
		}
	}
		//Lifecycle method (function) to connect to Firebase
		componentDidMount(){
		console.log('componentDidMount')
		//Snapshot is Firebase terminology, means current value 
		//at any given time
		firebase.database().ref('messages/').on('value', (snapshot)=>{

			const currentMessages = snapshot.val()

			if (currentMessages != null){
				this.setState({
					messages: currentMessages
				})
			}
		})
	}
	//Update function implemented
	updateMessage(event){
		console.log('updateMessage: '+event.target.value)
		//Message bound to state
		this.setState({
			message: event.target.value
		})
	}
		//Button function implemented
		submitMessage(event){
		console.log('submitMessage: '+this.state.message)
		//Preparing next message
		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message
		}
		//Firebase exchange between app and database
		firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
	}
	//Looping through messages array, creating list item for each
	//Passed into Map function rendering message inside list item
	render(){
		const currentMessage = this.state.messages.map((message, i) => {
			return (
				<li key={message.id}>{message.text}</li>
			)
		})
		return (
			//Messages arranged in unordered list.
			//function to update messages bound to this (line 73)
			//Button function bound to this (line 75)
			<div>
				<div id="messages">
				<ul>
					{currentMessage}
				</ul>
				</div>
				<div id="textInput">
				<input onChange={this.updateMessage} type="text" placeholder="Message" />
				<br />
				<button onClick={this.submitMessage}>Submit Message</button>
				</div>
			</div>
		)
	}
}

export default ChatAppMain