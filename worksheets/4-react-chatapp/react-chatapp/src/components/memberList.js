import React from 'react';
import fBase from '../config/fBase';
import Member from './member';

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberIDs: []
        }
    }

    componentDidMount() {
        fBase.database().ref('users/').on('value', snapshot => {
            let allMembers = [];
            snapshot.forEach(member => {
                allMembers.push(member.key)
            })
            this.setState({ memberIDs: allMembers });
        })
    }

    render() {
        return this.state.memberIDs.map(id => (
                <Member memberID={id} />
            )
        )
    }
}

export default MemberList;