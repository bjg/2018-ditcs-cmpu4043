/***
 * Name: UserPanel.js
 *
 * Description: - Functionality to display the channels on the control panel of the app.
 *              - Ability to add new channels.
 **/

import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions';

class Channels extends React.Component {

    // State fields change for channels
    state = {
        selectedChannel: '',
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        modal: false,
        firstLoad: true
    };

    // Function to set the first channel
    setFirstChannel = () => {

        // Getting the first channel
        // Access channels state and take the first one off the array.
        const firstChannel = this.state.channels[0];
        
        // If it's the fist time loading the page and if we have a channel
        if (this.state.firstLoad && this.state.channels.length > 0) {

            this.props.setCurrentChannel(firstChannel);
            this.setSelectedChannel(firstChannel);
        }

        this.setState({ firstLoad: false });
    };

    addChannelsListner = () => {

        // Array to gather channels and store.
        let channelsAvailable = [];

        this.state.channelsRef.on('child_added', snap => {

            channelsAvailable.push(snap.val());

            //console.log(channelsAvailable);

            // Change channels state and
            // Load channel on load
            this.setState({ channels: channelsAvailable }, () => this.setFirstChannel() );
        })
    };

    // Refs and Child Refs of the listner are turned off by calling .off()
    removeChannelsListner = () => { 
        
        this.state.channelsRef.off();
    };

    // Listner used to display all channels added
    componentDidMount() {

        this.addChannelsListner();
    };

    // Handle the case when the components unmounts, if going to different page.
    componentWillUnmount() {

        this.removeChannelsListner();
    };

    // Changes modal flag to true.
    openModal = () => this.setState({ modal: true });

    // Changes modal flag to false.
    closeModal = () => this.setState({ modal: false });

    // Updating state.
    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    };

    // Check to see if form is valid (Must contain detials)
    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;
    
    // Function to add channel.
    addChannel = () => {

        const { channelsRef, channelName, channelDetails, user } = this.state;

        // New key (ID) for every channel that's made.
        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,

            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channelName: '', channelDetails: '' });
                this.closeModal();
                console.log("Channel Added");
            })
            .catch(e => {
                console.error(e);
            })
    };

    // When add is pressed on creating a channel.
    handelSubmit = event => {

        event.preventDefault();
        
        // If form is valid.
        if(this.isFormValid(this.state)) {

            this.addChannel(); // Attempt to add channel.
        }
    };

    setSelectedChannel = channel => {

        this.setState({ selectedChannel: channel.id });
    };

    // Function to update global state by accepting in channel
    changeChannel = channel => {

        // Setting the current channel that is pressed.
        this.setSelectedChannel(channel);

        // Pass the channel to another function that will put it on global state.
        this.props.setCurrentChannel(channel);

        // Pass value to false.
        this.props.setPrivateChannel(false);

    };

    // Destructure channels and display
    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (

            <Menu.Item
                key={channel.id} // Set key
                onClick={() => this.changeChannel(channel) } // Pass the channel to update global state.
                name={channel.name} // Channel name.
                style={{ opacity: 1 }} // Postioning

                // When a channel is selected, highlight it.
                // If the channel ID is currenlt being iterated through
                active={ channel.id === this.state.selectedChannel }
            >
                {/* Enterpulate each channel of channel.name */}
                # { channel.name }
                
            </Menu.Item>
        ))
    );

    render() {

        const { channels, modal } = this.state;

        return(
            // React Fragment needed when grouping multiple components.
            <React.Fragment>
                <Menu.Menu className="menu" >
                    <Menu.Item>
                        <span>
                            <Icon name="server" /> Channels
                        </span>{" "}
                        ({ channels.length }) <Icon name="add" onClick={ this.openModal } />
                    </Menu.Item>

                    {/* Channels */}
                    { this.displayChannels(channels) }

                </Menu.Menu>

                {/* Adding Channel Modal*/}
                <Modal basic open={ modal } onClose={ this.closeModal }>
                    <Modal.Header>Add Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={ this.handelSubmit }>

                            { /* Name of Channel Field */}
                            <Form.Field>
                                <Input 
                                    fluid
                                    label="Name of Channel"
                                    name="channelName"
                                    onChange={ this.handleChange }
                                />
                            </Form.Field>

                            { /* Name of Channel Field */}
                            <Form.Field>
                                <Input 
                                    fluid
                                    label="Channel Description"
                                    name="channelDetails"
                                    onChange={ this.handleChange }
                                />
                            </Form.Field>

                        </Form>
                    </Modal.Content>

                    { /* Adding or cancelling a channel. */}
                    <Modal.Actions>

                        { /* Button to add channel. */}
                        <Button color="green" inverted onClick={ this.handelSubmit }>
                            <Icon name="checkmark" />Add
                        </Button>

                        { /* Button to cancel adding the channel. */}
                        <Button color="red" inverted onClick={ this.closeModal }>
                            <Icon name="remove" />Cancel
                        </Button>

                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Channels);