import React, { Component } from 'react';

import SignOut from '../SignOut';

import NavBar from '../NavBar';
import Users from '../Users';
import ChatWindow from '../ChatWindow';


import { AuthUserContext } from '../Session';

import { withAuthorization } from '../Session';

let currentlySelectedUser = 0;

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentlySelectedUser: 0
        }
    }

    // Use state to keep track of who the user is talking to
    changeWhoUserIsChattingTo = id => {
        this.setState({ currentlySelectedUser: id });
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        <NavBar loggedInAs={authUser.email} />
                        <div className="row">
                            <Users loggedInAs={authUser.email} loggedInAsID={authUser.uid} changeWhoUserIsChattingTo={this.changeWhoUserIsChattingTo} currentlySelectedUser={this.state.currentlySelectedUser} />
                            <ChatWindow loggedInAs={authUser.uid} loggedInAsUsername={authUser} currentlySelectedUser={this.state.currentlySelectedUser}/>
                        </div>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Chat);