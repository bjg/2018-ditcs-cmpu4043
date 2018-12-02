import React from "react";
import PropTypes from 'prop-types';


export class Message extends React.Component{  

    render(){
        return(
            <div className="message">
            
            <h3>{this.props.messageFromDB.userName}</h3>
            {this.props.messageFromDB.message}
            </div>
        );
    }
}
