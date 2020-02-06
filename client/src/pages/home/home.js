import React from 'react';
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
                Hello I am the home page
            </div>
        );
    }
}

export default withStyles(styles)(Home);