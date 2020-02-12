import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper, Grid, Button } from '@material-ui/core';
import { observable, decorate  } from 'mobx';
import { observer } from 'mobx-react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

// Component imports
import EmailRegexCheck from '../components/form/emailWithRegex';
import PasswordField from '../components/form/passwordField';
import ConfirmPasswordField from '../components/form/confirmPassword';
import * as Auth from '../axois/auth';

// Importing global state
import {globalState} from '../state/globalState';

const styles = theme => ({
    title: {
        textAlign: 'center',
    }
});

const Login = observer(class Login extends React.Component {
    constructor(props) {
        super(props);

        // Actual State is here, this will be shared with the sub components
        const loginState = {
            email: null,
            password: null,
            validEmail: false
        };

        // Decorating the objects in the state we want to observe
        decorate(loginState, {
            email: observable,
            password: observable,
            validEmail: observable
        });

        this.state = {
            loginState: loginState,
            emailError: '',
            passwordError: ''
        }
    }

    // Login the user
    handleSubmit= () => {
        let email = this.state.loginState.email;
        let password = this.state.loginState.password;

        console.log(email, password);
        Auth.login({ email: email, password: password })
        // Login successful
        .then((response) => {
            // Save the jwt as a cookie just in case and redirect
            cookie.save('JWT', response.data.jwt, { path: '/', maxAge: 3600 * 24 * 7 });
            // Saving the JWT in the global state
            globalState.appState.jwt = response.data.jwt;
            globalState.appState.user = jwtDecode(response.data.jwt);
            // Redirect to the home page
            this.props.history.push('/');
        })
        // Login failed
        .catch((error) => {
            if(error.response !== undefined) {
                let err = error.response.data.error;

                // Report the password Error
                if(err.toLowerCase().includes('password')) {
                    this.setState({passwordError: err});
                }

                // Rrport the email Error
                else if(err.toLowerCase().includes('email')) {
                    this.setState({emailError: err});
                }
            } else {
                console.log(error);
            }
        })

    }


    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth='sm' style={{backgroundColor: 'none'}}>

                <Paper elevation={3}>
                    <Grid container spacing={3} alignItems="center" justify="center"> 
                
                        <Grid item xs={12}>
                            <Typography variant='h3' className={classes.title}>Login</Typography>
                            <hr></hr>
                        </Grid>


                        {/* Email */}
                        <Grid item xs={9}>
                            {/* <TextField id="email" label="Email" fullWidth /> */}
                            <EmailRegexCheck 
                                emailState={this.state.loginState} 
                                emailError={this.state.emailError} 
                                noEmailCheck
                            />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={9}>
                            <PasswordField 
                                passwordState={this.state.loginState} 
                                passwordError={this.state.passwordError} 
                                noValidation
                                noValidMessage
                            />
                        </Grid>
                    </Grid>


                    {/* Used to make a breakpoint or a new line for the submit button */}
                    <Grid container spacing={3} alignItems="center" justify="center"> 
                        {/* Submit Form */}
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }

});

export default withStyles(styles)(Login);