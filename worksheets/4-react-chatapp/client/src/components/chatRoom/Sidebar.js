import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import firebase from '../../config/firebaseConfig'
import roomAction from "../../actions/roomAction";
import {connect} from "react-redux";
import { Input } from 'semantic-ui-react';


class Sidebar extends React.Component {

    state = {
        rooms: [],
        users: [],
        uid: '',
        newRoomName: ''
    }

    changeCurrentRoom = (e, isRoom) => this.props.changeChat(e.target.innerText, isRoom)

    componentDidMount(){
        const mainScope = this

        firebase.database().ref('rooms').on('child_added', function(snapshot, prevChildName) {
            mainScope.setState(previousState => ({
                rooms: [...previousState.rooms, snapshot.val()]
            }))
        });

        firebase.database().ref('users').on('child_added', function(snapshot, prevChildName) {

            //do not display username if it is current users username
            if (snapshot.key === mainScope.props.uid) return

            mainScope.setState(previousState => ({
                users: [...previousState.users, snapshot.key]
            }))
        });
    }

    createRoom = () => {
        firebase.database().ref('rooms').push(this.state.newRoomName).then(function(){
        }).catch(function(err){
            console.log(err)
        });
    }

    roomNameFieldChanged = (e) => {
        this.setState({
            newRoomName: e.target.value
        })
    }

    render() {
        const { rooms, users, uid, newRoomName } = this.state
        const changeCurrentRoom = this.changeCurrentRoom
        return (
            <div style={{background: '#24292e', display: 'inline-block', verticalAlign: 'top', minHeight: '100vh', width: '220px'}}>

                <h4 className="sidebarUsername">{this.props.uid}</h4>

                <Modal trigger={<Button>Add room</Button>}>
                    <Modal.Header>Pick a room name</Modal.Header>
                    <Modal.Content style={{textAlign: 'center'}}>
                        <Input
                            placeholder="Enter Room Name"
                            value={newRoomName}
                            onChange={this.roomNameFieldChanged}
                        />

                        <Button style={{display: 'block', margin: '10px auto 0 auto'}} primary onClick={this.createRoom}>Create room</Button>

                    </Modal.Content>
                </Modal>

                <div>
                    <h4 className="sidebarHeading">Rooms</h4>
                    {rooms.map(function(room, index) {
                        return <div key={index}>
                            <button className="sidebarChatName" onClick={(e) => changeCurrentRoom(e, true)}>{room}</button>
                        </div>
                    })}
                </div>

                <div>
                    <h4 className="sidebarHeading">Direct Messages</h4>
                    {users.map(function(user, index) {
                        return <div key={index}>
                            <button className="sidebarChatName" onClick={(e) => changeCurrentRoom(e, false)} >{user}</button>
                        </div>
                    })}
                </div>

            </div>
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
        changeChat: ((chatName, isRoom) => {
            dispatch(roomAction.changeChat(chatName, isRoom))
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
