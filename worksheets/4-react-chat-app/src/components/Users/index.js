import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import CreateGroup from '../CreateGroup';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            currentlySelectedUser: null,
        }
    }

    componentDidMount() {
        this.setState({ loading: true });

        // Get the all of the users from Firebase.
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
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render () {
        return (
            <div className="col-md-4" style={{ marginRight: '0px', paddingRight: '0px' }}>
                <ul className="list-group" style={{ borderRadius: '0px' }}>

                    <CreateGroup users={this.state.users}/>
                    {
                        this.state.users.map(user => (
                            <a onClick={() => this.props.changeWhoUserIsChattingTo(user.uid)} className={"list-group-item list-group-item-action " + (this.props.currentlySelectedUser == user.uid ? 'active' : '')} style={{ borderRadius: '0px' }}><h5>{user.username}<br /><small>{user.email}</small></h5></a>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default withFirebase(Users);