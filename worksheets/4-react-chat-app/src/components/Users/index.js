import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false
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
            <div className="col-md-4">
                <ul className="list-group" style={{ borderRadius: '0px' }}>
                    {
                        this.state.users.map(user => (
                            <li class="list-group-item" style={{ borderRadius: '0px' }}><h5>{user.username}<br/><small>{user.email}</small></h5></li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default withFirebase(Users);