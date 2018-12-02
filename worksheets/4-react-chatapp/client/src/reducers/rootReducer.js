const initState = {
    uid: false,
    currentRoom: 'room',
    chatBeingViewed: {
        chatName: 'room',
        isRoom: true
    },
    roomMessages: []
}

const rootReducer = (state = initState, action) => {

    if (action.type === 'SAVE_USER_ID'){
        return {
            ...state,
            uid: action.uid
        }

    } else if (action.type === 'CHANGE_CHAT'){
        return {
            ...state,
            chatBeingViewed: {
                chatName: action.chatname,
                isRoom: action.isRoom
            }
        }
    }

    return state
}

export default rootReducer
