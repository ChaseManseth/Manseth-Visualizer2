const axios = require('axios');

export function registerUser(user) {
    return axios.post('/api/auth/register', user);
}

export function login(user) {
    return axios.post('/api/auth/login', user);
}