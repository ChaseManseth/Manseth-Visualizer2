import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container,CssBaseline } from '@material-ui/core';


const styles = theme => ({

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