import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container, TextField } from '@material-ui/core';


const styles = theme => ({

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
            <Container maxWidth='sm'> 
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField color='dark' id="standard-basic" label="Standard" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>
            </Container>
        );
    }
}

export default withStyles(styles)(Register);