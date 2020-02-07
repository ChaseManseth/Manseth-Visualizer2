import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Container, TextField, Paper, Grid, Button } from '@material-ui/core';
import { observable, decorate  } from 'mobx';
import { observer } from 'mobx-react';

// Component imports
import EmailRegexCheck from '../components/form/emailWithRegex';

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
            validConfirm: false,
        };

        // decorating objects in the state we want to observe
        decorate(registerState, {
            email: observable,
            password: observable,
            validConfirm: observable,
         });

        this.state = {
            registerState: registerState
        };
    }



    handleChangeEmail = (email) => {
        console.log('parent got', email);
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
                            <EmailRegexCheck registerState={this.state.registerState} />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={9}>
                            <TextField type="password" id="password" label="Password" fullWidth />
                        </Grid>

                        {/* Confirm Password */}
                        <Grid item xs={9}>
                            <TextField type="password" id="confirmPassword" label="Confirm Password" fullWidth />
                        </Grid>
                    </Grid>


                    {/* Used to make a breakpoint or a new line for the submit button */}
                    <Grid container spacing={3} alignItems="center" justify="center"> 
                        {/* Submit Form */}
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth>
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