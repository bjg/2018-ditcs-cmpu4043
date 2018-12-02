/***
 * Name: App.js
 *
 * Description: - Other heart of the app.
 *              - How the main chat page looks like.
 **/

import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ControlPanel from './chat/ControlPanel/ControlPanel';
import MessagesPanel from './chat/MessagesPanel/MessagesPanel';
import './App.css';

const App = ({ currentUser, currentChannel, isPrivateChannel }) => (
  
  <Grid columns="equal" className="app" style={{ background: '#eee' }}>

    { /* Pass the user to Control Panel. */}
    <ControlPanel
      key={ currentUser && currentUser.uid } 
      currentUser={ currentUser }/>

    <Grid.Column style={{ marginLeft: 350 }}>

      <MessagesPanel
        key={ currentChannel && currentChannel.id } 
        currentChannel={ currentChannel }
        currentUser={ currentUser }
        isPrivateChannel={ isPrivateChannel } 
      />

    </Grid.Column>

    <Grid.Column width={ 1 } >
    </Grid.Column>
  </Grid>
)

// Passing down relevant information for other classes to use
const mapStateToProps = state => ({

  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,

  // Determine if a channel is private
  isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(App);