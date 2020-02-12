// Author: Chase Manseth
// Date: 2/8/2020
import React from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';

// The function to validate a password
// This function will return error numbers if the password doesn't match certain criteria
// Return Value Meaning -
// 0 - Valid Password
// 1 - Password length is too short
// 2 - Password is missing a capital letter
// 4 - Password is missing a special character
function validatePassword(password) {
    const minPasswordLength = 8;
    var result = 0;
    var captialRegex = new RegExp('.*[A-Z].*');
    var specialRegex = new RegExp('.*[^A-Za-z0-9].*');

    // Checking Length
    if(password.length < minPasswordLength) {
        result += 1;
    }

    // Checking Capital Character
    if(!captialRegex.test(password)) {
        result += 2;
    }

    // Checking for special character
    // Negative Match
    if(!specialRegex.test(password)) {
        result += 4;
    }

    return result;
};


// This is the main React Class for the Registration Password TextField
const PasswordField = observer(class PasswordField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: null,
            validPassword: false,
            errorText: '',
            noValidate: false,
            noValidMessage: false,
        };
    }

    // Load in component settings
    componentDidMount() {
        const props = this.props;
        
        // No validation setting
        if(props.noValidation !== undefined) {
            this.setState({noValidate: true});
        }

        // No valid message
        if(props.noValidMessage !== undefined) {
            this.setState({noValidMessage: true});
        }
    }

    // See if an error has been passed down from the parent component
    componentDidUpdate(prevProps) {
        if(this.props.passwordError !== prevProps.passwordError) {
            this.setState({
                errorText: this.props.passwordError,
                validPassword: false
            });
        }
    }

    handlePasswordChange = (password) => {
        // Let parent know password
        this.props.passwordState.password = password;
        this.setState({password: password});
        
        // If prop has no validate setting then skip
        if(this.state.noValidate) {
            this.setState({validPassword: true});
            return;
        }

        // Validate the password
        var validResult = validatePassword(password);

        // If password passes all requirements then 
        if(validResult === 0) {
            // Notify the parent and change valid state
            this.props.passwordState.validPassword = true;

            this.setState({
                validPassword: true,
                errorText: ''
            });
        } else {
            var bitPos = 0;
            var errorMsg = '';
            // Get the error values and print a meaningful error message
            while(validResult > 0) {
                if(validResult % 2 === 1) {
                    
                    // Short Length Error
                    switch(bitPos) {
                        case 0: errorMsg += 'Password is too short.\n'; break;
                        case 1: errorMsg += 'Password needs to contain at least one capital letter.\n'; break;
                        case 2: errorMsg += 'Password needs to contain at least one special character.\n'; break;
                        default: break;
                    }
                }
                bitPos++;
                validResult = validResult >> 1;
            }


            // Notify the parent and change valid state
            this.props.passwordState.validPassword = false;

            this.setState({
                errorText: errorMsg,
                validPassword: false
            });
        }
    }

    render() {
        // Handling error
        if(this.state.password !== null && !this.state.validPassword) {
            return (
                <TextField type="password" id="password" label="Password" fullWidth error 
                    onChange={(event) => this.handlePasswordChange(event.target.value)}
                    value={this.state.password == null ? '' : this.state.password}
                    helperText={this.state.errorText}
                />
            );
        } 
        // Valid
        else if(this.state.password !== null && this.state.validPassword && !this.state.noValidMessage) {
            return (
                <TextField type="password" id="password" label="Password" fullWidth 
                    onChange={(event) => this.handlePasswordChange(event.target.value)}
                    value={this.state.password == null ? '' : this.state.password}
                    helperText='Password looks good!'
                />
            );
        }

        // Nothing has happened yet
        else {
            return (
                <TextField type="password" id="password" label="Password" fullWidth 
                    onChange={(event) => this.handlePasswordChange(event.target.value)}
                    value={this.state.password == null ? '' : this.state.password}
                />
            );
        }
    }


});

export default PasswordField;