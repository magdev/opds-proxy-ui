export const RESET = 'RESET'
export const QUERY = 'QUERY'
export const RESULTS = 'RESULTS'
export const PAGE = 'PAGE'
export const PAGES = 'PAGES'
export const PER_PAGE = 'PER_PAGE'
export const COUNT = 'COUNT'


const initialState = {
    query: '',
    results: [],
    page: 1,
    count: 0,
    perPage: 0,
    pages: 0
}


const actions = {
    reset ({ commit }) {
        commit(RESET)
    },
    query ({ commit }, query) {
        commit(QUERY, query)
    },
    results ({commit}, results) {
        commit(RESULTS, results)
    },
    count ({commit}, count) {
        commit(COUNT, count)
    },
    page ({commit}, page) {
        commit(PAGE, page)
    },
    pages ({commit}, pages) {
        commit(PAGES, pages)
    },
    perPage ({commit}, perPage) {
        commit(PER_PAGE, perPage)
    },
}

const getters = {
    query (state) {
        return state.query
    },
    results (state) {
        return state.results
    },
    count (state) {
        return state.count
    },
    page (state) {
        return state.page
    },
    pages (state) {
        return state.pages
    },
    perPage (state) {
        return state.perPage
    },
}

const mutations = {
  [RESET]: state => ({ ...initialState }),
  [QUERY] (state, query) {
    state.query = query
  },
  [RESULTS](state, results) {
    state.results = results;
  },
  [COUNT](state, count) {
    state.count = count;
  },
  [PAGE](state, page) {
    state.page = page;
  },
  [PAGES](state, pages) {
    state.pages = pages;
  },
  [PER_PAGE](state, perPage) {
    state.perPage = perPage;
  },
}

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}