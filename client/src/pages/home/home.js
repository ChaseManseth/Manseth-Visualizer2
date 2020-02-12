import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Container,CssBaseline } from '@material-ui/core';
import { observer, } from 'mobx-react';

// Importing global state
import {globalState} from '../../state/globalState';

const styles = theme => ({

});

const Home = observer(class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'Some Value'
        };
    }

    componentDidMount() {
        console.log('home',globalState.appState.jwt);
    }

    
    render() {
        const { classes } = this.props;

        if(globalState.appState.jwt !== null && globalState.appState.user !== null) {
            return (
                <div>Hello, {globalState.appState.user.user.email} you are logged in</div>
            )
        }
        return (
            <div>
                Hello I am the home page
            </div>
        );
    }
});

export default withStyles(styles)(Home);