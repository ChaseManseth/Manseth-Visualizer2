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

const Register = observer(class Register extends React.Component {
    constructor(props) {
        super(props);

        // Actual State is in this object
        const registerState = {
            email: null,
            validEmail: false,
            password: null,
            validPassword: false,
            validConfirm: false,
        };

        // decorating objects in the state we want to observe
        decorate(registerState, {
            email: observable,
            validEmail: observable,
            password: observable,
            validPassword: observable,
            validConfirm: observable,
         });

        this.state = {
            registerState: registerState,
            emailError: ''
        };
    }


    // Register the User
    // This function checks to make sure everything is valid then makes an axios 
    // call to the register endpoint
    handleSubmit = () => {
        let state = this.state.registerState;

        if(state.validEmail && state.validPassword && state.validConfirm) {
            Auth.registerUser({
                email: state.email,
                password: state.password
            })
            // Registreation successful!
            .then((response) => {
                // Save the jwt as a cookie just in case and redirect
                cookie.save('JWT', response.data.jwt, { path: '/', maxAge: 3600 * 24 * 7 });
                // Saving the JWT in the global state
                globalState.appState.jwt = response.data.jwt;
                globalState.appState.user = jwtDecode(response.data.jwt);
                // Redirect to the home page
                this.props.history.push('/');
            })
            .catch((error) => {
                if(error.response !== undefined) {
                    this.setState({emailError: error.response.data.error});
                } else {
                    console.log(error);
                }
            });
        }
    }
    
    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth='sm' style={{backgroundColor: 'none'}}>

                <Paper elevation={3}>
                    <Grid container spacing={3} alignItems="center" justify="center"> 
                
                        <Grid item xs={12}>
                            <Typography variant='h3' className={classes.title}>Register</Typography>
                            <hr></hr>
                        </Grid>


                        {/* Email */}
                        <Grid item xs={9}>
                            {/* <TextField id="email" label="Email" fullWidth /> */}
                            <EmailRegexCheck emailState={this.state.registerState} emailError={this.state.emailError} />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={9}>
                            <PasswordField passwordState={this.state.registerState} />
                        </Grid>

                        {/* Confirm Password */}
                        <Grid item xs={9}>
                            <ConfirmPasswordField passwordState={this.state.registerState} password={this.state.registerState.password}/>
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

export default withStyles(styles)(Register);