import React from "react";
import PropTypes from 'prop-types';


export class Message extends React.Component{  
    render(){
        return(
            <div className="message">
            <h3>{this.props.user}</h3>
            {this.props.message}
            </div>
        );
    }
}
