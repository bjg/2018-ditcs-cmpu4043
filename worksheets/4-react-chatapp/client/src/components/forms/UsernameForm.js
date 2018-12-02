import React from 'react';
import PropTypes from 'prop-types'
import { Input, Button } from 'semantic-ui-react'
import { Label } from 'semantic-ui-react'

class UsernameForm extends React.Component {
    state = {
        username: '',
        loading: false,
        error: '',
        inputType: 'loading'
    };

    submitName = async (e) => {
        e.preventDefault()
        let error = this.validateUsername(this.state.username)

        if (error) {
            this.setState({error: error})
            return
        }

        error = await this.props.submit(this.state.username)
        if (error) this.setState({error: error})
    }

        validateUsername = (username) => {
        let error = false
        if (!username) error = 'Must have a username'
        if (username.length < 5) error = 'Password needs to be longer'
        return error
    }

    usernameChanged = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    render() {
        const { username, error, inputType } = this.state
        return (

            <div>
                <h2 style={{color: '#999'}}>Create a username</h2>

                <div style={{minHeight: '40px'}}>
                {
                (error !== '') &&
                <Label basic color='red' pointing='below'>
                {error}
                </Label>
                }
                </div>

                <form  onSubmit={this.submitName}>
                <Input style={{width: '250px', marginBottom: '10px'}}
                type='text'
                placeholder="Enter username"
                value={username}
                onChange={this.usernameChanged}
                />
                </form>

                <Button primary style={{width: '250px'}} onClick={this.submitName}> Submit </Button>
            </div>
        )
    }
}

UsernameForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default UsernameForm