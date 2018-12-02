/***
 * Name: PrivateMessages.js
 *
 * Description: - Functionality to display User's to Private Message.
 *              - Ability to message a User privately.
 **/

import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions';
import firebase from '../../firebase';

class PrivateMessages extends React.Component {

    state = {
        activeChannel: '',
        user: this.props.currentUser,
        users: [],
        usersRef: firebase.database().ref('users'),
    };

    // When component mounts.
    componentDidMount() {

        // Check to see if user data exists.
        if (this.state.user) {
            this.addListeners(this.state.user.uid);
        }
    };

    // Refs and Child Refs of the listner are turned off by calling .off()
    removeListners = () => { 
        this.state.usersRef.off();
    };

    // Handle the case when the components unmounts, if going to different page.
    componentWillUnmount() {

        this.removeListners();
    };

    // Listner to collect all users.
    addListeners = currentUserUid => {

        let loadedUsers = [];

        // Listen for any new children that are added
        this.state.usersRef.on('child_added', snap => {

            // Check if current UID is not equal to snap.key
            // To not include the current auth user.
            if (currentUserUid !== snap.key) {

                let user = snap.val();
                user['uid'] = snap.key;
                loadedUsers.push(user);

                this.setState({ users: loadedUsers });
            }
        });
    };

    setActiveChannel = userId => {

        this.setState({ activeChannel: userId });
    };

    changeChannel = user => {

        const channelId = this.getChannelId(user.uid);
        const channelData = {

            id: channelId,
            name: user.name
        };

        this.props.setCurrentChannel(channelData);

        this.props.setPrivateChannel(true);

        this.setActiveChannel(user.uid);
    };

    getChannelId = userId => {

        const currentUserId = this.state.user.uid;

        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    };

    render() {

        const { users, activeChannel } = this.state;

        return(

            <Menu.Menu className="menu">

                <Menu.Item>

                    <span>
                        <Icon name="mail" /> Private Messages
                    </span>{' '}
                    ({ users.length })

                </Menu.Item>

                {/* Users to Private Message */}
                { users.map(user => (
                    <Menu.Item
                        key={user.uid}
                        active={user.uid === activeChannel}
                        onClick={() => this.changeChannel(user)}
                        style={{ opacity: 1, fontStyle: 'italic' }}
                    >
                        @ {user.name} 
                    </Menu.Item>

                ))}
                
            </Menu.Menu>

        )
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(PrivateMessages);