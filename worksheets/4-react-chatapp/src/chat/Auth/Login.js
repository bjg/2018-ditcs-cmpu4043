/***
 * Name: Login.js
 *
 * Description: - Login Form to allow the user to login to the Chat App.
 **/

import React from "react";
import firebase from "../../firebase";
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false
    };

    // Displaying errors to user.
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    // Used to update state for inputs in the form.
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Used when the submit button is pressed.
    handleSubmit = event => {
        
        event.preventDefault();
        
        if (this.isFormValid(this.state)) {
            
            this.setState({ errors: [], loading: true });
            
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch(err => {
                    //console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                });
        }

    };
  
    isFormValid = ({ email, password }) => email && password;
  
    handleInputError = (errors, inputName) => {
        
        return errors.some(error => 
            error.message.toLowerCase()
                .includes(inputName)) ? "error" : "";
    };
  
    render() {
        
        const { email, password, errors, loading } = this.state;
        
        return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 500 }}>
                <Header as="h1" icon color="blue" textAlign="center">
                    <Icon name="fire" color="blue"/>
                    Login to Chat App
                </Header>

                {/* Create the Form */}    
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment stacked>

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

                        {/* Password - Fluid takes up the whole width*/}
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
                
                {errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>
                )}
                <Message>Not registered? <Link to="/register">Register</Link></Message>
            </Grid.Column>
        </Grid>

        ); // End Return.

    } // End Render.

} // End Login Class.
  
  export default Login;