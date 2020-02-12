// Created By Chase Manseth
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";
import { observable, decorate } from 'mobx';
import { observer, } from 'mobx-react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

// Custom Theme Import
import Theme from './theme/darkTheme';

// Component Imports
import Header from './components/navbar/guestNavBar';

// Global State
import {globalState} from './state/globalState';

// This is the main element that gets rendered for the entire web application
const App = observer(class App extends React.Component {
    // On reload try to get JWT from cookies
    componentDidMount() {
        let jwt = cookie.load('JWT');
        if(jwt !== undefined) {
            globalState.appState.jwt = jwt;
            console.log('Setting State:', jwt);
            globalState.appState.user = jwtDecode(jwt);
            console.log(jwtDecode(jwt));
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <CssBaseline />
                <Header></Header>
            </MuiThemeProvider>
        );
    }
    
});

export default App;