import axios from 'axios';
import settings from '@/settings'

const instance = axios.create({
    timeout: settings.API_REQUEST_TIMEOUT
});
export default {
    login (username, password) {
        return instance.post('/api/security/login', {
            username: username,
            password: password
        })
    },

    status () {
        return instance.get('/api/security/status')
    },

    logout () {
        return instance.get('/logout')
    }
}