import React from 'react';
import fireBase from '../config/fireBase';
import Member from './Members';

class MemberList extends React.Component 
{
    constructor(props) 
	{
        super(props);
        this.state = 
		{
            mIDs: []
        }
    }

    componentDidMount() {
        fireBase.database().ref('users/').on('value', snapshot => 
		{
            let allMembers = [];
            snapshot.forEach(member => 
			{
                allMembers.push(member.key)
            })
            this.setState({ memberIDs: allMembers });
        })
    }

    render() 
	{
        return this.state.mIDs.map(id => (
                <Member mID={id} />
            )
        )
    }
}

export default MemberList;