// Created By Chase Manseth
import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Test from './pages/test.js';

// This is the main element that gets rendered for the entire web application
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
            
                <Switch>
                    <Route path="/login">
                        <div>
                            <Test/>
                        </div>
                    </Route>
                    <Route path="/register">
                        <div>
                            Register Page
                        </div>
                    </Route>
                    <Route path="/">
                        <div>
                            Home Page
                        </div>
                    </Route>
            </Switch>
            </div>
        );
    }
}

export default App;