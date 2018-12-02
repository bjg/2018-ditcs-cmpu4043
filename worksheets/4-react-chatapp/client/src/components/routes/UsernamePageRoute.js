import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from "react-router-dom"

let username = localStorage.chatroom_username

const UsernamePageRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
        !username? <Component {...props} /> : <Redirect to="/chatroom" />}
    />
);

UsernamePageRoute.propTypes = {
    component: PropTypes.func.isRequired,
}


export default UsernamePageRoute;
