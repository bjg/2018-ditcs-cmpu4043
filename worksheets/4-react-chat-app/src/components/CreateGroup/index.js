import React, { Component } from 'react'

import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class CreateGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createGroupOpen: false
        }

        // Bind this to the createButtonClicked
        this.createGroupButtonClicked = this.createGroupButtonClicked.bind(this);
    }

    createGroupButtonClicked() {
        this.setState({createGroupOpen: true});
    }

    createGroup = event => {
        console.log(event);

        // Don't refresh/don't let any event do anything.
        event.preventDefault();
    }

    render () {
        if(this.state.createGroupOpen) {
            return (
                <div>
                    <div className="list-group-item list-group-item-action " style={{ borderRadius: '0px' }}>
                        <form onSubmit={this.createGroup}>
                            <div className="form-group">
                                <input type="text" class="form-control" placeholder="Group Name"></input>
                            </div>
                            <div className="form-group">
                                <select multiple className="form-control">
                                    {this.props.users.map(user => (
                                        <option value={user.uid}>{user.username}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-secondary btn-block"><i className="fa fa-plus"></i> Create Group</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="list-group-item list-group-item-action " style={{ borderRadius: '0px' }}>
                        <button onClick={this.createGroupButtonClicked} className="btn btn-secondary btn-block"><i className="fa fa-plus"></i> Create Group</button>
                    </div>
                </div>
            )
        }
    }
}

export default CreateGroup