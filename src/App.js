import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
	  super();
	  this.state = {
		  username: '',
		  message: ''
		}
	this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
	  this.setState({
		  [e.target.name] : e.target.value
	  });
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Chat App</h1>
              
            </div>
        </header>

        <div className='container'>
          <section className='inputbox'>
              <form>
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="message" placeholder="Message" onChange={this.handleChange} value={this.state.message}/>
                <button>Add Item</button>
              </form>
          </section>

          <section className='message-list'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App