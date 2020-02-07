import React from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';

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

    handleEmailChange = (email) => {
        var pattern = new RegExp(".+@.+\\..+", "g");
        var validEmail = pattern.exec(email) !== null;

        // console.log('Email Test: ', validEmail, pattern.exec(email));
        if(validEmail) {
            this.setState({validEmail: validEmail});
            this.props.registerState.validEmail = validEmail;
        } else {
            this.setState({validEmail: false});
            this.setState({errorText: 'Invalid Email Address'});
        }

        this.setState({email: email});

        this.props.registerState.email = email;
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // TODO: Need to check if email already exists in DB
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
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
                onChange={(event) =>this.handleEmailChange(event.target.value)}
                value={this.state.email == null ? '' : this.state.email}  
            />
        );
    }
});

export default EmailRegexCheck;
