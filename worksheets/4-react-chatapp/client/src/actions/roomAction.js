export default {
    changeChat: (chatname, isRoom) => {
        return {
            type: 'CHANGE_CHAT',
            chatname,
            isRoom
        }
    }
}

