import React, { Component } from 'react'
import SignOut from '../SignOut';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">React Chat App</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                        <span class="navbar-text">
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