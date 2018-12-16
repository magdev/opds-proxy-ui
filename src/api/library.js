import axios from 'axios';
import settings from '@/settings'

const instance = axios.create({
    timeout: settings.API_REQUEST_TIMEOUT
});

export default {
    stats () {
        return instance.get('/api/stats/')
    },

    recent(limit) {
        return instance.get('/api/recent/?limit=' + limit)
    }
}