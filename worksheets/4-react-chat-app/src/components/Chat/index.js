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
            users: [],
            currentlySelectedUser: 0
        }
    }

    // Use state to keep track of who the user is talking to
    changeWhoUserIsChattingTo = id => {
        this.setState({ currentlySelectedUser: id });
    }

    componentDidMount() {
        this.setState({ loading: true });

        // Get all of the users from Firebase.
        this.props.firebase.users().orderByChild('email').on('value', snapshot => {
            const usersObject = snapshot.val();

            // Filter the users first
            let users = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: users
            });
        });
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        <NavBar loggedInAs={authUser.email} />
                        <div className="row">
                            <Users loggedInAs={authUser.email} loggedInAsID={authUser.uid} changeWhoUserIsChattingTo={this.changeWhoUserIsChattingTo} currentlySelectedUser={this.state.currentlySelectedUser} />
                            <ChatWindow users={this.state.users} loggedInAs={authUser.uid} loggedInAsUsername={authUser} currentlySelectedUser={this.state.currentlySelectedUser}/>
                        </div>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Chat);