/***
 * Name: ControlPanel.js
 *
 * Description: - Parent section of where the channels, private channels and user section are stored.
 **/
import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';
import PrivateMessages from './PrivateMessages';

class ControlPanel extends React.Component {

    render() {

        const { currentUser } = this.props;

        return (

            // Left hand side of the app
            // To be used for navigation and loging out.
            <Menu size="huge" inverted fixed="left" vertical style={{ background: '#79BAEC', fontSize: '1.5rem'}}>

                {/* Display the username. (Pass it down to UserPanel) */}
                <UserPanel currentUser={ currentUser } />

                {/* Pass UserName down to Channels. */}
                <Channels currentUser={ currentUser } />

                {/* Direct Messages Component */}
                <PrivateMessages currentUser={ currentUser } />
            </Menu>
        )
    }
}

export default ControlPanel;