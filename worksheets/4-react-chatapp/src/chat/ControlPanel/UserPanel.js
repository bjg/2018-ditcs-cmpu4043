/***
 * Name: UserPanel.js
 *
 * Description: - Top section of the control panel.
 *              - Allow's user to see their name.
 *              - Allow's user to logout of the app.
 **/

import React from 'react';
import { Grid, GridRow, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

// Class based component, stateful component
class UserPanel extends React.Component {

    state = {

        user: this.props.currentUser
    };

    // Lifecycle method to obtain user.
    componentWillReceiveProps(nextProps) {

        this.setState({ user: nextProps.currentUser });
    };

    logoutActivity = () => {

        firebase
            .auth()
            .signOut()
    };

    // Array to hold the options for the dropdown menu.
    userOptionsDropdown = () => [

        // Display name of signed in user.
        {
            key: 'user',
            // First check to see if we have a value then include the displayName.
            text: <span>Signed in as <strong>{ this.state.user.displayName }</strong></span>,
            disabled: true
        },

        // Log out of the application.
        {
            key: 'logout',
            text: <span onClick={ this.logoutActivity }>Logout</span>
        }
    ];

    render() {

        // Destructure, get the user.
        const { user } = this.state;

        // Check to see if user is being passed correctly.
        //console.log(this.props.currentUser);

        return (

            // Icon at the top for chat app.
            <Grid style={{ background: '#79BAEC' }}>
                <Grid.Column>
                    <GridRow style={{ padding: '1em', margin: 0 }}>

                        {/* Application Header */}
                        <Header inverted floated="left" as="h3">
                            <Icon name="fire" />
                            <Header.Content>Chat App</Header.Content>
                        </Header>

                    </GridRow>

                    {/* Dropdown Menu */}
                    <Header style={{ padding: '1.3em' }} as="h4" inverted>
                        <Dropdown 
                            trigger={ 
                            <span>
                                {/* Display user profile */}
                                <Image src={ user.photoURL } spaced="right" avatar ></Image>

                                {/* Display username */}
                                { user.displayName }
                            </span> }

                            options={ 
                                this.userOptionsDropdown() } >
                        </Dropdown>
                    </Header>

                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel;