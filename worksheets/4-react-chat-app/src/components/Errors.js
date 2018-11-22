import React, { Component } from 'react'

class Errors extends Component {

    createErrors() {
        let errors = []
        if(this.props.errors != null) {
            errors = <div className="alert alert-secondary"><div className="text-center">{this.props.errors.message}</div></div>;
        }
        return errors;
    }

    render () {
        return (
            <div>
                {this.createErrors()}
            </div>
        )
    }
}

export default Errors