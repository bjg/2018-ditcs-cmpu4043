import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import CreateGroup from '../CreateGroup';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            groups: [],
            loading: false,
            currentlySelectedUser: null,
        }
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
            
            // Filter the users so that the currently logged in user isn't displayed
            users = users.filter(user => user.email != this.props.loggedInAs);

            this.setState({
                users: users
            });
        });

        // Get all of the groups from Firebase.
        this.props.firebase.group().on('value', snapshot => {
            const groupsObject = snapshot.val();

            let groups = Object.keys(groupsObject).map(key => ({
                ...groupsObject[key],
                groupId: key,
            }));

            console.log(groups);

            // Filter the groups so only the ones with this user in it is displayed
            groups = groups.filter(group => group.members.includes(this.props.loggedInAsID));

            console.log(groups);

            this.setState({groups: groups});

            console.log(this.state.groups);
        });
    }

    componentWillUnmount() {
        // Turn off users and groups when component unmounts
        this.props.firebase.users().off();
        this.props.firebase.group().off();
    }

    render () {
        return (
            <div className="col-md-4" style={{ marginRight: '0px', paddingRight: '0px' }}>
                <ul className="list-group" style={{ borderRadius: '0px' }}>

                    <CreateGroup loggedInAsID={this.props.loggedInAsID} users={this.state.users}/>
                    {
                        this.state.groups.map(group => (
                            <a onClick={() => this.props.changeWhoUserIsChattingTo(group.uid)} className={"list-group-item list-group-item-action " + (this.props.currentlySelectedUser == group.uid ? 'active' : '')} style={{ borderRadius: '0px' }}><h5><i className="fa fa-users"></i> {group.name}<br /></h5></a>
                        ))
                    }
                    {
                        this.state.users.map(user => (
                            <a onClick={() => this.props.changeWhoUserIsChattingTo(user.uid)} className={"list-group-item list-group-item-action " + (this.props.currentlySelectedUser == user.uid ? 'active' : '')} style={{ borderRadius: '0px' }}><h5><i className="fa fa-user"></i> {user.username}<br /><small>{user.email}</small></h5></a>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default withFirebase(Users);