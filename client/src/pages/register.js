import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, TextField, Paper, Grid, Button } from '@material-ui/core';


const styles = theme => ({
    title: {
        textAlign: 'center',
    }
});

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
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
                            <TextField id="email" label="Email" fullWidth />
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
}

export default withStyles(styles)(Register);