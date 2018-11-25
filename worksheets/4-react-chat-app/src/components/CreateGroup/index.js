import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';


class CreateGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createGroupOpen: false,
            groupName: '',
            groupMembers: []
        }

        // Bind this to the createButtonClicked
        this.createGroupButtonClicked = this.createGroupButtonClicked.bind(this);
    }

    createGroupButtonClicked() {
        this.setState({createGroupOpen: true});
    }

    createGroup = event => {
        const {groupName, groupMembers} = this.state;

        // Send it to Firebase using "push" for unqiue ids
        var newGroupRef  = this.props.firebase.group().push();

        // Set the message
        newGroupRef.set({
            name: groupName,
            members: groupMembers
        });

        this.setState({ groupName: '', groupMembers: [], createGroupOpen: false});

        // Don't refresh/don't let any event do anything.
        event.preventDefault();
    }

     // On change method for the form
    createGroupChange = event => {
        // Change the groupName
        if (event.target.name == 'groupName') {
            this.setState({ groupName: event.target.value});
        // Add the selected member
        } else if (event.target.name == 'groupMembers') {
            var value = [];
            for (var i = 0, l = event.target.options.length; i < l; i++) {
                if (event.target.options[i].selected) {
                    value.push(event.target.options[i].value);
                }
            }

            // We also need to add the current user to the group because that is the person creating it.
            value.push(this.props.loggedInAsID);

            this.setState({groupMembers: value});
        }

    }

    render () {
        if(this.state.createGroupOpen) {
            return (
                <div>
                    <div className="list-group-item list-group-item-action " style={{ borderRadius: '0px' }}>
                        <form onSubmit={this.createGroup}>
                            <div className="form-group">
                                <input type="text" name="groupName" class="form-control" placeholder="Group Name" onChange={this.createGroupChange}/>
                            </div>
                            <div className="form-group">
                                <select multiple name="groupMembers" className="form-control" onChange={this.createGroupChange}>
                                    {this.props.users.map(user => (
                                        <option value={user.uid}>{user.username}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-secondary btn-block"><i className="fa fa-plus"></i> Create Group</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="list-group-item list-group-item-action " style={{ borderRadius: '0px' }}>
                        <button onClick={this.createGroupButtonClicked} className="btn btn-secondary btn-block"><i className="fa fa-plus"></i> Create Group</button>
                    </div>
                </div>
            )
        }
    }
}

export default withFirebase(CreateGroup);