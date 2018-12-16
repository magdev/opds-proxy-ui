import axios from 'axios';
import settings from '@/settings'

const instance = axios.create({
    baseURL: settings.SCRAPYD_HOST,
    timeout: settings.API_REQUEST_TIMEOUT
});

instance.defaults.headers.post['Content-Type'] = settings.SCRAPYD_POST_CONTENT_TYPE;

export default {
    projects () {
        return instance.get('/listprojects.json')
    },

    status () {
        return instance.get('/daemonstatus.json')
    },

    spiders (project) {
        return instance.get('/listspiders.json?project=' + project)
    },

    schedule (project, spider) {
        return instance.post('/schedule.json', 'project=' + project + '&spider=' + spider)
    },

    cancel (project, id) {
        return instance.post('/cancel.json', 'project=' + project + '&job=' + id)
    },

    jobs (project) {
        return instance.get('/listjobs.json?project=' + project)
    }
}