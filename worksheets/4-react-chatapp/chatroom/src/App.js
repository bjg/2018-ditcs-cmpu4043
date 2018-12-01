import React from 'react';
import LoginPage from './LoginPage'
import ChatPage from './ChatPage'

class App extends React.Component
{
  constructor()
  {
    super();

    //this will bind the login handler, which will allow it to be passed into sub components
    this.isLoggedHandler = this.isLoggedHandler.bind(this);

    //change the log state depending on the local storage
    this.state = {
      logged: localStorage.getItem('chatRoomLogged'),
    };
  }

  //method to set the log in state depeding on the parameter
  isLoggedHandler(isLogged)
  {
    this.setState({logged: isLogged});
  }

  render(){
    //if the user is already logged in, send them to the chat page
    if (this.state.logged === '1')
    {
      return <ChatPage isLoggedHandler= {this.isLoggedHandler}></ChatPage>
    }
    //if the user is not logged in, bring them to the login page
    else
    {
      return <LoginPage isLoggedHandler= {this.isLoggedHandler}></LoginPage>
    }
  }
}

export default App;
