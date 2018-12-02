import React from "react";

//Statless component. Is a fat arrow function instead of class
export const Header = (props) => {
    
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <div className="nav navbar-nav">
                            <li><a href="">{props.chatName}</a></li>
                        </div>
                    </div>
                </div>
            </nav>
        );
};
