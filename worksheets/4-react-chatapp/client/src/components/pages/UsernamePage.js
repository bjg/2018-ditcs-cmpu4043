import React from 'react';
import UsernameForm from '../forms/UsernameForm'
import {connect} from "react-redux";
import { saveUserID } from '../../actions/uidAction'
import firebase from '../../config/firebaseConfig'
import { Segment } from 'semantic-ui-react'

class UsernamePage extends React.Component{
    submit = (async uid => {
        const app = this
        let error = null
        const usernames = []

        const usernamesSnapshot = await firebase.database().ref('users').once('value')
        for (const username in usernamesSnapshot.val()) usernames.push(username)

        if (!usernames.includes(uid)) {
            firebase.database().ref('users').child(uid).child('timestamp').set('testing')
                .then(function(){
                    localStorage.chatroom_username = uid
                    app.props.saveUserID(uid)
                    app.props.history.push("/chatroom")

                }).catch(err => console.log(err))

        }else error = 'username already exists'

        return error
    })

    render() {
        return (

            <Segment raised id="usernameFieldContainer">
                <h1>Lab 4 <br/> Rich web <br/> Abdulaziz Ismail</h1>
                <UsernameForm submit={this.submit} />
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserID: (value => {
            dispatch(saveUserID(value))
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernamePage)
