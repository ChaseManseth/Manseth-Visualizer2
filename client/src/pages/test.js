import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {/* This is a test of how to have nested routes inside routes */}
                <BrowserRouter basename="/login">
                    <Switch>
                        <Route path="/test">
                            <div>Test</div>
                        </Route>
                        <Route path="/test1">
                            <div>Test1Teeeee</div>
                        </Route>
                        <Route path="/test2">
                            <div>Test2</div>
                        </Route>
                        <Route path="/">
                            <div>I am the Login Page</div>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}