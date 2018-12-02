/***
 * Name: index.js
 *
 * Description: - Global State change based on type.
 **/

import * as actionTypes from './types';

/* User Actions */

// Set the user to the global state.
export const setUser = user => {

    return {

        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
};

// Remove the user from the global state
export const clearUser = () => {

    return {

        type: actionTypes.CLEAR_USER
    }
};

/* Channel Actions */

// Set the current channel to global channel.
export const setCurrentChannel = channel => {

    return {

        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
};

export const setPrivateChannel = isPrivateChannel => {

    return {

        type: actionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
};