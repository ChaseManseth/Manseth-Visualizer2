// Created By Chase Manseth
import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Test from './pages/test.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";

// Custom Theme Import
import Theme from './theme/darkTheme';

// Component Imports
import Header from './components/navbar/guestNavBar';

// Page Imports
import Home from './pages/home/home.js';

// Colors
// #202225
// #2f3136
// #36393f

// This is the main element that gets rendered for the entire web application
class App extends React.Component {
    

    render() {
        
    
        return (
            <MuiThemeProvider theme={Theme}>
                <CssBaseline />
                <Header></Header>
            </MuiThemeProvider>
        );
    }
    
}

export default App;