export const RESET = 'RESET'
export const STATS = 'STATS'
export const RECENT = 'RECENT'


const initialState = {
    stats: {},
    recent: []
}


const actions = {
    reset ({ commit }) {
        commit(RESET)
    },
    stats ({ commit }, stats) {
        commit(STATS, stats)
    },
    recent ({ commit }, recent) {
        commit(RECENT, recent)
    },
}

const getters = {
    stats (state) {
        return state.stats
    },
    recent (state) {
        return state.recent
    },
}


const mutations = {
  [RESET]: state => ({ ...initialState }),
  [STATS] (state, stats) {
    state.stats = stats
  },
  [RECENT] (state, recent) {
    state.recent = recent
  },
}


export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}