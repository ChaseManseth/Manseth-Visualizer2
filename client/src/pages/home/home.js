import React from 'react';
import GuestNavBar from '../../components/navbar/guestNavBar';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container,CssBaseline } from '@material-ui/core';


const styles = theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    root: {
        backgroundColor: 'red',
        marginLeft: theme.spacing(7) + 1,
        width: `calc(100% - 57px)`,
        padddingLeft: theme.spacing(3)
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    
    render() {
        const { classes } = this.props;


        return (
            <div>
                <GuestNavBar/>
                <div className={classes.toolbar} />
                <Container maxWidth="xl" className={classes.root}>
                    Hello World abore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consec
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Home);