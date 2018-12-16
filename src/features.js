import Vue from 'vue'
import Features from 'vue-feature-toggle'

if (process.env.NODE_ENV !== 'production') {
  Features.showLogs()
}

Features.visibility('pre-release', function () {
  return process.env.NODE_ENV !== 'production'
})
Features.visibility('search', function () {
  return false
})

Vue.prototype.$features = Features

export default {
  Features
}
