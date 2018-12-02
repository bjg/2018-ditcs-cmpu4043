/***
 * Name: Register.js
 *
 * Description: - Register Form for a user to register to Chat App.
 **/

import React from "react";
import firebase from "../../firebase";
import md5 from "md5";
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
    
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users")
    };

    // Used to check if a form is valid.
    isFormValid = () => {
        
        let errors = [];
        let error;
        
        if (this.isFormEmpty(this.state)) {
            
            error = { message: "All fields must be filled in." };
            this.setState({ errors: errors.concat(error) });

            //console.log("All fields must be filled in.");

            return false;

        } else if (!this.isPasswordValid(this.state)) {
            
            error = { message: "Password is invalid." };
            this.setState({ errors: errors.concat(error) });

            //console.log("Password is invalid.");

            return false;

        } else {
            
            return true;
        }

    };

    // Used to check if all fields are entered on form.
    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        
        return ( !username.length || !email.length || 
            !password.length || !passwordConfirmation.length
        );
    };

    // Used for password validation.
    isPasswordValid = ({ password, passwordConfirmation }) => {

        // Password must be of length 8 or more.
        if (password.length < 8 || passwordConfirmation.length < 8) {
            
            return false;

        } else if (password !== passwordConfirmation) { // Values are the same
        
            return false;

        } else { // Passwords are okay, proceed.
        
            return true;
        }

    };

    // Displaying errors to user
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    // Used to update state for inputs in the form.
    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    };

    // Used when the submit button is pressed.
    handleSubmit = event => {
        
        event.preventDefault(); // Reload the page when submit clicked.
        
        if (this.isFormValid()) {
            
            this.setState({ errors: [], loading: true });
            
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    
                    console.log(createdUser);

                    // Display name
                    // Using email as it's the unique value as required by Firebase.
                    createdUser.user
                    .updateProfile({
                        displayName: this.state.username,

                        //?d-identicon used to get a generated avatar.
                        //https://en.gravatar.com/site/implement/
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                    .then(() => {
                        this.saveUser(createdUser)
                    })
                    .catch(err => {
                        //console.error(err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            loading: false
                        });
                    });
                })
                .catch(err => {
                    //console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                });

        } 

    };

    // Saving the user name and avatar to the database on Firebase.
    saveUser = createdUser => {

        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    };

    // // Handles user errors. To display the red box around an incorrect field.
    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase()
                .includes(inputName)) ? "error" : "";
    };
    
    render() {
        
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        
        return (

        // Grid component as the parent component.
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 500 }}>
                <Header as="h1" icon color="blue" textAlign="center">
                    <Icon name="fire" color="blue" />
                        Register to Chat App
                </Header>

                {/* Create the Form */}
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment stacked>

                        {/* Username */}
                        <Form.Input
                            fluid
                            name="username"
                            icon="user"
                            iconPosition="left"
                            placeholder="Full Name"
                            onChange={this.handleChange}
                            value={username}
                            type="text" />

                        {/* Email */}
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Address"
                            onChange={this.handleChange}
                            value={email}
                            className={this.handleInputError(errors, "email")}
                            type="email" />

                        {/* Password */}
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={password}
                            className={this.handleInputError(errors, "password")}
                            type="password" />

                        {/* Password Confirmation */}
                        <Form.Input
                            fluid
                            name="passwordConfirmation"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="Password Confirmation"
                            onChange={this.handleChange}
                            value={passwordConfirmation}
                            className={this.handleInputError(errors, "password")}
                            type="password" />

                        {/* Submit Button */}  
                        <Button
                            disabled={loading}
                            className={loading ? "loading" : ""}
                            color="blue"
                            fluid
                            size="large" >
                            Submit
                        </Button>
                    </Segment>
                </Form>
                
                {/* Error Display */}
                {errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>
                )}

                {/* Navigation to Login if user has an account. */}
                <Message>Already have an account? <Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
        
        ); // End Return.
    
    } // End Render.

} // End Register Class.

export default Register;