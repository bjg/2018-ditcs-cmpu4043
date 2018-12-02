import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import {fb, db} from './fire'
import "./App.css"

let newMessages = []
class Chat extends Component {
  constructor(props) {
    super(props)
	this.state = {text: "", messages: [] , user:"", users:[], target:"", isMounted:false}
  }
  componentDidMount() {
	this.setState({user:localStorage.getItem('user'), isMounted:true})
    this.getMessages()
  }

  onSubmit = event => {
    if (event.charCode === 13 && this.state.text.trim() !== "") {
      this.writeMessageToDB(this.state.text)
      this.setState({ text: "" })
    }
  }

  writeMessageToDB = text => {
    db.collection("messages").add({
        to:this.state.target,
        from:this.state.user,
        message:text
    })
  }

  getMessages = () => {
      db.collection("messages").where("to", "==", "")
            .onSnapshot((querySnapshot) => {

                querySnapshot.docChanges.forEach((change) => {
                    if (change.type === "added") {
                    let data = change.doc.data()
                    newMessages.push({ id: change.doc.id, from: data.from, message: data.message})
                }

                this.setState({ messages: newMessages})
            })
        });
  }

  renderMessages = () => {
  if(this.state.isMounted){
    return this.state.messages.map(message => (
      <ListItem>
        <ListItemText
          style={{ wordBreak: "break-word" }}
          primary={[message.from,':',message.message].join(' ')}
        />
      </ListItem>
    ))
  }
  }
  
  setTarget = (user) =>{
	  this.setState({target: user.username});
  }
  
  renderUsers = () => {
	  if(this.state.isMounted){
	return this.state.users.map(user => (
      <ListItem>
        <ListItemText onClick={this.setTarget(user)}
          style={{ wordBreak: "break-word" }}
          primary={user.username}
        />
      </ListItem>
    ))
	  }
  }
  

  render() {
    return (
      <div className="App">
        <List>{this.renderMessages()}</List>
        <TextField
          autoFocus={true}
          multiline={true}
          rowsMax={3}
          placeholder="Type something.."
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.onSubmit}
          style={{ width: "98vw", overflow: "hidden" }}
        />
        <span ref={el => (this.bottomSpan = el)} />
		<List>{this.renderUsers()}</List>
      </div>
    )
  }
}

export {Chat}