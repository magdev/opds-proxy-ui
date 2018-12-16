export const RESET = 'RESET'
export const ERROR = 'ERROR'
export const MESSAGE = 'MESSAGE'
export const MESSAGE_DEL = 'MESSAGE_DEL'


const initialState = {
    messages: []
}


const actions = {
    reset ({ commit }) {
        commit(RESET)
    },
    error ({ commit }, error) {
        commit(ERROR, error)
    },
    message ({ commit }, message) {
        commit(MESSAGE, message)
    },
    removeMessage ({ commit }, message) {
        commit(MESSAGE_DEL, message)
    },
}

const getters = {
    messages (state) {
        return state.messages
    },
}


const mutations = {
  [RESET]: state => ({ ...initialState }),
  [ERROR] (state, error) {
        let message
        if (typeof error == 'string') {
            message = error;
        } else {
            message = JSON.stringify(error)
        }
        if (message) {
            state.messages.push({
                message: message,
                variant: 'danger'
            })
        }
    },
    [MESSAGE] (state, message) {
        state.messages.push(message)
    },
    [MESSAGE_DEL] (state, index) {
        state.messages.splice(index, 1)
    },
}


export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}