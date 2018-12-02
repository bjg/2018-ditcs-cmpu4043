import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ChatRoom from './components/ChatAppMain'

class App extends Component {

	render(){
		return (
			<div>
				<h2>Welcome to the Chat App!</h2>
				<ChatRoom />
			</div>

		)
	}
}

ReactDOM.render(<App />, document.getElementById('chatapp'))