import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Error.css';

export default class Error extends Component {
    render() {
        return (
            <div className="Error">
                <h1>404: Not Found</h1>
            </div>
        );
    }
}