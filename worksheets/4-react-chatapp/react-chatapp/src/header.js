import React from 'react';
import logo from './config/React-icon.png';
import './header.css';

class Header extends React.Component {

    render() {
        return (
            <div>
                <h1>React Chat App</h1>
                <img src={logo}></img>
            </div>
        )
    }
}

export default Header;