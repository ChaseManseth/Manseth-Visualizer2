const axios = require('axios');

export function registerUser(user) {
    return axios.post('/api/auth/register', user);
}