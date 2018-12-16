export const RESET = 'RESET'
export const STATUS = 'STATUS'
export const HOST = 'HOST'
export const JOBS = 'JOBS'
export const PROJECTS = 'PROJECTS'
export const PROJECT = 'PROJECT'
export const SPIDERS = 'SPIDERS'
export const STATS = 'STATS'
export const UPDATE_PROJECTS = 'UPDATE_PROJECTS'


const initialState = {
    status: null,
    host: null,
    jobs: {
        pending: [],
        running: [],
        finished: []
    },
    stats: {
        pending: 0,
        running: 0,
        finished: 0
    },
    projects: [],
    spiders: [],
    project: '',
}


const actions = {
    reset ({ commit }) {
        commit(RESET)
    },
    status ({ commit }, status) {
        commit(STATUS, status)
    },
    host ({ commit }, host) {
        commit(HOST, host)
    },
    jobs ({ commit }, jobs) {
        commit(JOBS, jobs)
    },
    projects ({ commit }, projects) {
        commit(PROJECTS, projects)
    },
    project ({ commit }, project) {
        commit(PROJECT, project)
    },
    spiders ({ commit }, spiders) {
        commit(SPIDERS, spiders)
    },
    stats ({ commit }, stats) {
        commit(STATS, stats)
    },

    updateProjects ({ commit }, stats) {
        commit(UPDATE_PROJECTS, stats)
    }
}


const getters = {
    status (state) {
        return state.status
    },
    jobs (state) {
        return state.jobs
    },
    projects (state) {
        return state.projects
    },
    project (state) {
        return state.project
    },
    spiders (state) {
        return state.spiders
    },
    host (state) {
        return state.host
    },
    stats (state) {
        return state.stats
    },
}


const mutations = {
  [RESET]: state => ({ ...initialState }),
  [STATUS] (state, status) {
    state.status = status
  },
  [JOBS] (state, jobs) {
    state.jobs = jobs
  },
  [PROJECTS] (state, projects) {
    state.projects = projects
  },
  [PROJECT] (state, project) {
    state.project = project
  },
  [SPIDERS] (state, spiders) {
    state.spiders = spiders
  },
  [HOST] (state, host) {
    state.host = host
  },
  [STATS] (state, stats) {
    state.stats = stats
  },
  [UPDATE_PROJECTS] (state, projects) {
    state.projects = projects
  },
}


export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}