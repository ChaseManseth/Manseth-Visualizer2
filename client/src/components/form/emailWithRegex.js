// Author: Chase Manseth
// Date: 2/8/2020
import React from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';

// Axios call import
import * as User from '../../axois/user';

const EmailRegexCheck = observer(class EmailRegexCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            validEmail: true,
            usedEmail: false,
            errorText: ''
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.emailError !== prevProps.emailError) {
            this.setState({
                errorText: this.props.emailError, 
                usedEmail: true, 
                validEmail: false
            });
        }
    }

    handleEmailChange = (email) => {
        var pattern = new RegExp(".+@.+\\..+", "g");
        var validEmail = pattern.exec(email) !== null;

        // console.log('Email Test: ', validEmail, pattern.exec(email));
        if(validEmail) {
            this.setState({validEmail: validEmail});
            this.props.emailState.validEmail = validEmail;
        } else {
            this.setState({validEmail: false});
            this.setState({errorText: 'Invalid Email Address'});
            this.props.emailState.validEmail = validEmail;
        }

        this.setState({email: email});

        this.props.emailState.email = email;
    }

    // This is used to check if the user email already exists in the database
    onExitFocus = (email) => {
        User.checkEmail(email).then((response) => {
            let result = response.data.valid;
            if(result) {
                this.setState({
                    validEmail: false,
                    errorText: 'Email already exists!'
                });

                // Notify Parent
                this.props.emailState.validEmail = false;
            }
        }).catch((error) => console.log(error));
    }
    
    render() {
        if(!this.state.validEmail) {
            return(
                <TextField id="email" label="Email" fullWidth error
                    onChange={(event) =>this.handleEmailChange(event.target.value)}
                    value={this.state.email == null ? '' : this.state.email}
                    helperText={this.state.errorText}     
                />
            );
        }

        return(
            <TextField id="email" label="Email" fullWidth 
                onChange={(event) => this.handleEmailChange(event.target.value)}
                value={this.state.email == null ? '' : this.state.email}
                onBlur={(event) => this.onExitFocus(event.target.value)}  
            />
        );
    }
});

export default EmailRegexCheck;
