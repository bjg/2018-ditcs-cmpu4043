import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import firebase from "firebase"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { text: "", messages: [] }
  }
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyDSB2ejIDQ0e_EfOF5-1eqSAFl0HJ3ghzY",
      authDomain: "lab4-f5be6.firebaseapp.com",
      databaseURL: "https://lab4-f5be6.firebaseio.com",
      projectId: "lab4-f5be6",
      storageBucket: "",
      messagingSenderId: "907268260619"
    }
    firebase.initializeApp(config)
    this.getMessages()
  }

  onSubmit = event => {
    if (event.charCode === 13 && this.state.text.trim() !== "") {
      this.writeMessageToDB(this.state.text)
      this.setState({ text: "" })
    }
  }

  writeMessageToDB = message => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message
      })
  }

  getMessages = () => {
    var messagesDB = firebase
      .database()
      .ref("messages/")
      .limitToLast(500)
    messagesDB.on("value", snapshot => {
      let newMessages = []
      snapshot.forEach(child => {
        var message = child.val()
        newMessages.push({ id: child.key, text: message.text })
      })
      this.setState({ messages: newMessages })
      this.bottomSpan.scrollIntoView({ behavior: "smooth" })
    })
  }

  renderMessages = () => {
    return this.state.messages.map(message => (
      <ListItem>
        <ListItemText
          style={{ wordBreak: "break-word" }}
          primary={message.text}
        />
      </ListItem>
    ))
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
      </div>
    )
  }
}

export default App