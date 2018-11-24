import React, { Component } from 'react'
import SignOut from '../SignOut';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">React Chat App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                        
                        </ul>
                        <span className="navbar-text">
                            <button type="button" className="btn btn-light">Logged in as {this.props.loggedInAs}</button>
                            &nbsp;
                            <SignOut />
                        </span>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;