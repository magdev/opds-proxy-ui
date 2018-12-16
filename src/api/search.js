import axios from 'axios';
import settings from '@/settings'

const instance = axios.create({
    timeout: settings.API_REQUEST_TIMEOUT
});
export default {
    query (query, page) {
        page = page || 1
        return instance.get('/api/search/?q=' + query + '&page=' + page)
    },
}