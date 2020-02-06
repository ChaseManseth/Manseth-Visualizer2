// Created By Chase Manseth
import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Test from './pages/test.js';

// Component Imports
import Header from './components/navbar/guestNavBar';

// Page Imports
import Home from './pages/home/home.js';

// This is the main element that gets rendered for the entire web application
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Header></Header>
            </div>
        );
    }
}

export default App;