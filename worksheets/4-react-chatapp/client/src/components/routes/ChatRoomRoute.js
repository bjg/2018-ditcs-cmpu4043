import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'

const ChatRoomRoute = ({uid, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            uid? <Component {...props} /> : <Redirect to="/" />}
    />
);

ChatRoomRoute.propTypes = {
    component: PropTypes.func.isRequired,
}


function mapStateToProps(state) {
    return {
        uid: !!state.uid
    }
}

export default connect(mapStateToProps)(ChatRoomRoute);
