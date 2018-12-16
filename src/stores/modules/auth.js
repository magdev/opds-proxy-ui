import AuthAPI from '@/api/auth';

export const RESET = 'RESET'
export const JWT = 'JWT'
export const ENDPOINTS = 'ENDPOINTS'
export const AUTHENTICATING = 'AUTHENTICATING'
export const AUTHENTICATING_ERROR = 'AUTHENTICATING_ERROR'
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER'
export const DEAUTHENTICATING_ERROR = 'DEAUTHENTICATING_ERROR'


const initialState = {
    jwt: null,
    endpoints: {
        obtainJWT: '/auth/obtain_token',
        refreshJWT: '/auth/refresh_token'
    },
    error: null,
    isAuthenticated: false,
    user: {}
}


const actions = {
    reset ({ commit }) {
        commit(RESET)
    },
    jwt ({ commit }, jwt) {
        commit(JWT, jwt)
    },
    login ({commit}, payload) {
        commit(AUTHENTICATING);
        return AuthAPI.login(payload.username, payload.password)
            .then(response => commit(AUTHENTICATED_USER, response.data))
            .catch(err => commit(AUTHENTICATING_ERROR, err));
    },
    logout({commit}) {
        commit(DEAUTHENTICATING);
        return AuthAPI.logout()
            .then(() => commit(RESET))
            .catch(err => commit(DEAUTHENTICATING_ERROR, err));
    },
    status ({commit}) {
        return AuthAPI.status()
            .then(response => commit(AUTHENTICATED_USER, response.data))
            .catch(err => commit(AUTHENTICATING_ERROR, err));
    }
}

const getters = {
    jwt (state) {
        return state.jwt
    },
    isAuthenticated (state) {
        return state.isAuthenticated
    },
    error (state) {
        return state.error
    },
    hasError (state) {
        return state.error !== null
    },
    user (state) {
        return state.user
    },
    userId (state) {
        return state.user.id
    }
}


const mutations = {
  [RESET]: state => ({ ...initialState }),
  [JWT] (state, jwt) {
    state.jwt = jwt
  },
  [AUTHENTICATING](state) {
    state.error = null;
    state.isAuthenticated = false;
  },
  [AUTHENTICATING_ERROR](state, error) {
    state.error = error;
    state.user = {};
    state.isAuthenticated = false;
  },
  [AUTHENTICATED_USER](state, user) {
    state.error = null;
    state.user = user;
    state.isAuthenticated = true;
  },
  [DEAUTHENTICATING_ERROR](state, error) {
    state.error = error;
  }
}


export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
}