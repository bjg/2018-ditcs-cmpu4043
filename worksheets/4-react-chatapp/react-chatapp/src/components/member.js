import React from 'react';
import fBase from '.././config/fBase';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberID: '',
            memberName: ''
        }
        this.getMemberName = this.getMemberName.bind(this);
    }

    componentDidMount() {
        var id = this.props.memberID;
        fBase.database().ref('users/').child(id).once('value', snapshot => {
            var member = snapshot.val();
            this.setState({ 
                memberName: member.name,
                memberID: id
            });
        })
    }

    getMemberName() {
        return this.state.memberName;
    }

    render() {
        let user = fBase.auth().currentUser;
        if (user.uid !== this.state.memberID) {
            return (
                <p>{this.getMemberName()}</p>
            )
        }
        else {
            return (null)
        }
    }
}

export default Member;