const axios = require('axios');

export function checkEmail(email) {
    return axios.post('/api/user/emailCheck', {email: email});
}