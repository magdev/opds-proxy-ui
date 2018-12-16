export const RESET = 'RESET'

const initialState = {}

const actions = {
    reset ({ commit }) {
        commit(RESET)
    },
}

const getters = {
    
}

const mutations = {
    [RESET]: state => ({ ...initialState }),
}

export default {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
}