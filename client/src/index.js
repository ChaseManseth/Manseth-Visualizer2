import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import axios from 'axios';

// Global State
import {globalState} from './state/globalState';


// Handling Axios Interceptors
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
	let auth = globalState.state.jwt;
	
	if(auth != null) {
		request.headers.common['Authorization'] = 'Bearer ' + auth['access_token'];
		console.log('Axios intercept: ', request.headers.common['Authorization']);
	}
	console.log(request);

	return request;
}, error => Promise.reject(error))



ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
