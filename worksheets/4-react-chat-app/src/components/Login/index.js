import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import Errors from '../Errors';

import { withFirebase } from '../Firebase';
import { SignUpForm } from '../SignUp';

const Login = () => (
    <div>
        <LoginForm />
    </div>
)

const INITIAL_FORM_STATE = {
    email: '',
    password: ''
}

class LoginFormBase extends Component {

    constructor(props) {
        super(props);

        // Set the initial state of the form
        this.state = { ...INITIAL_FORM_STATE };
    }

    // On change method for the form
    onChange = event => {
        // Set the state
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const {email, password} = this.state;

        // Try log the user in
        this.props.firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                // Set the state back to nothing
                this.setState({...INITIAL_FORM_STATE});

                // Redirect now to the chat app.
                this.props.history.push(ROUTES.CHAT);
            })
            .catch(error => {
                this.setState({ error });
            });
        
        // Don't refresh/don't let any event do anything.
        event.preventDefault();
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                    <div className="login">
                        <Errors errors={this.state.error} />
                        <h4>React Chat App <small>Login</small></h4>
                        <br />
                        <div className="card">
                            <div className="card-body">
                                <div className="login-form">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type="email" name="email" className="form-control" onChange={this.onChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input id="password" type="password" name="password" className="form-control" onChange={this.onChange} />
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Login</button>
                                    </form>
                                    <br />
                                    <div className="text-center"><p>Don't have an account? <a href="/signup">Sign Up now.</a></p></div>
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

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default Login;

export { LoginForm };