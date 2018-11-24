import React, { Component } from 'react';

import SignOut from '../SignOut';

import NavBar from '../NavBar';
import Users from '../Users';
import ChatWindow from '../ChatWindow';


import { AuthUserContext } from '../Session';

import { withAuthorization } from '../Session';


const Chat = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <NavBar loggedInAs={authUser.email}/>
                <div className="row">
                    <Users loggedInAs={authUser.email}/>
                    <ChatWindow />
                </div>
            </div>
        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Chat);