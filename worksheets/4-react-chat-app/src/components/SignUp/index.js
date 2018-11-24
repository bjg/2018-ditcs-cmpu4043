import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import Errors from '../Errors';

// Import high order component to wrap the component to have Firebase
import { withFirebase } from '../Firebase';

// Create a constant with SignUpForm in it, as if the its a component
const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
)

const INITIAL_FORM_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

// Define the SignUpForm as a base
class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        // Set the state at the start to the INITIAL_STATE values
        this.state = { ...INITIAL_FORM_STATE };
    }

    // On change method for the form below
    onChange = event => {
        // Set the state of whatever the name of the even is (i.e the input name)
        // To the value entered in it
        this.setState({ [event.target.name]: event.target.value });
    };

    // When the form is submitted 
    onSubmit = event => {
        // Get the current values of the inputs and set it to a constant so no changing
        const { username, email, password, confirmPassowrd } = this.state;

        this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // Create the user in the real time database
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    })
                    .then(() => {
                        // Set the state back to the intial default values
                        this.setState({ ...INITIAL_FORM_STATE });

                        // Redirect now to the chat app
                        this.props.history.push(ROUTES.CHAT);
                    })
                    .catch(error => {
                        this.setState({ error });
                    });
                    
            })
            .catch(error => {
                this.setState({ error });
            });
        // Don't refresh/don't let any event do anything.
        event.preventDefault();

    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                    <div className="signup">
                        <Errors errors={this.state.error} />
                        <h4>React Chat App <small>Sign Up</small></h4>
                        <br />
                        <div className="card">
                            <div className="card-body">
                                <div className="signup-form">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input id="username" type="text" name="username" className="form-control" onChange={this.onChange} value={this.state.username} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type="email" name="email" className="form-control" onChange={this.onChange} value={this.state.email} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input id="password" type="password" name="password" className="form-control" onChange={this.onChange} value={this.state.password} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input id="confirmPassword" type="password" name="confirmPassword" className="form-control" onChange={this.onChange} value={this.state.confirmPassword} />
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Sign Up</button>
                                        <br />
                                        <div className="text-center"><p>Already have an account? <a href="/">Login now.</a></p></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
            </div>
        )
    }
}

// Wrap the SignUpForm base component in both the withFirebase higher-order component and withRouter
// To allow us to use Firebase in it, but also to redirect using the router's props sent in with withRouter.
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;

export { SignUpForm };