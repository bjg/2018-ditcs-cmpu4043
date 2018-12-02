/***
 * Name: index.js
 *
 * Description: - Reducers used for Global State changes with Redux.
 **/

import * as actionTypes from '../actions/types';
import { combineReducers } from "redux";

// What the user state will look like without any changes.
const initialUserState = {
    currentUser: null,
    isLoading: true
};

/* User Properties Reducers */

const user_reducer = (state = initialUserState, action) => {

    switch (action.type) {

        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            };
        
        case actionTypes.CLEAR_USER:
            return {
                ...state, // Spread operator
                isLoading: false
            };
             
        default:
            return state;
    }
};

// Starting state for a channel
const initialChannelState = {

    currentChannel: null,
    isPrivateChannel: false
};

/* Channel Properties Reducers */

const channel_reducer = (state = initialChannelState, action) => {

    switch (action.type) {

        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        
        case actionTypes.SET_PRIVATE_CHANNEL:
            return {
                ...state,
                isPrivateChannel: action.payload.isPrivateChannel
            }
        
        default: 
            return state;
    }

};

// Operate on a certain part of state.
const rootReducer = combineReducers({

    user: user_reducer,
    channel: channel_reducer
});

export default rootReducer;