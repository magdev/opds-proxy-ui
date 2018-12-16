import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuexI18n from 'vuex-i18n'
import moment from 'moment'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import Features from '@/features'
import settings from '@/settings'
import LocaleDE from '@/locales/de.json'
import LocaleEN from '@/locales/en.json'
import Messages from '@/components/common/Messages'
import Stats from '@/components/library/Stats'
import VueClipboard from 'vue-clipboard2'
import Recent from '@/components/library/Recent'

Vue.prototype.$moment = moment
Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(vuexI18n.plugin, store)

Vue.component('feature', Features)
Vue.component('op-messages', Messages)
Vue.component('op-stats', Stats)
Vue.component('op-recent', Recent)

Vue.i18n.add('de', LocaleDE)
Vue.i18n.add('en', LocaleEN)
Vue.i18n.set(settings.APP_LOCALE)
Vue.i18n.fallback(settings.APP_FALLBACK_LOCALE)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
