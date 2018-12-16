import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import modules from '@/stores/index'

Vue.use(Vuex)
const APP_KEY = process.env.APP_KEY || 'opds-proxy-ui'
const isNotProd = process.env.NODE_ENV !== 'production'
const isNotTest = process.env.NODE_ENV !== 'test'

export default new Vuex.Store({
  modules,
  strict: isNotProd,
  plugins: []
    .concat(isNotTest ? [createPersistedState({ key: APP_KEY })] : [])
    .concat(isNotProd ? [createLogger({})] : []),
})
