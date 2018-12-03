import React from 'react';
import fireBase from '.././config/fireBase';

class Member extends React.Component 
{
    constructor(props) 
	{
        super(props);
        this.state = 
		{
            mID: '',
            mName: ''
        }
        this.getName = this.getName.bind(this);
    }

    componentDidMount() 
	{
        var id = this.props.mID;
        fireBase.database().ref('users/').child(id).once('value', snapshot => 
		{
            var member = snapshot.val();
            this.setState({ 
                mName: member.name,
                mID: id
            });
        })
    }

    getName() 
	{
        return this.state.mName;
    }

    render() 
	{
        let user = fireBase.auth().currentUser;
        if (user.id !== this.state.mID) 
		{
            return (
                <p>{
					this.getName()
					}</p>
            )
        }
        else 
		{
            return (null)
        }
    }
}

export default Member;