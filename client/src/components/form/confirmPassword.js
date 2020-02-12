// Author: Chase Manseth
// Date: 2/8/2020
import React from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';

const ConfirmPasswordField = observer(class ConfirmPasswordField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: null,
            confirmPassword: null,
            same: false
        };
    }

    // Getting the password after every change
    componentDidUpdate(prevProps) {
        if(this.props.password !== prevProps.password) {
            let password = this.props.password;
            this.setState({ password: password });
            this.comparePassword(password, this.state.confirmPassword);
        }
    }

    // Seeing if the passwords match
    comparePassword = (password, confirmPassword) => {
        console.log(password, confirmPassword);
        if(password === confirmPassword) {
            // Change state and notify parent
            this.setState({same: true});
            this.props.passwordState.validConfirm = true;
        } else {
            this.setState({same: false});
            this.props.passwordState.validConfirm = false;
        }
    }

    handleConfirmPasswordChange = (confirmPassword) => {
        this.setState({confirmPassword: confirmPassword});
        // Check if the passwords are the same
        this.comparePassword(this.state.password, confirmPassword);
    }


    render() {
        // First time
        if(this.state.confirmPassword === null) {
            return (
                <TextField type="password" id="confirmPassword" label="Confirm Password" fullWidth 
                    onChange={(event) => this.handleConfirmPasswordChange(event.target.value)}
                    value={this.state.confirmPassword == null ? '' : this.state.confirmPassword}
                />
            );
        }

        // Passwords are not the same
        else if(!this.state.same ) {
            return (
                <TextField type="password" id="confirmPassword" label="Confirm Password" fullWidth error
                    onChange={(event) => this.handleConfirmPasswordChange(event.target.value)}
                    value={this.state.confirmPassword == null ? '' : this.state.confirmPassword}
                    helperText='Passwords do not match!'
                />
            );
        } 
        
        // Passwords are the same
        else {
            return (
                <TextField type="password" id="confirmPassword" label="Confirm Password" fullWidth 
                    onChange={(event) => this.handleConfirmPasswordChange(event.target.value)}
                    value={this.state.confirmPassword == null ? '' : this.state.confirmPassword}
                    helperText='Passwords Match!'
                />
            );
        }
    }
});

export default ConfirmPasswordField;