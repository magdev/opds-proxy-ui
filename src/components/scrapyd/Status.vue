<template>
    <b-nav-text v-if="host" class="py-0">
        <small>
            <a :href="scrapydUrl" target="_blank" class="mr-1">{{ $t('scrapyd.statusbar', { host: host }) }}</a>
            <b-badge :variant="statusClass">{{ status }}</b-badge>
        </small>
    </b-nav-text>
</template>

<script>
import ScrapydAPI from '@/api/scrapyd'
import settings from '@/settings'

export default {
  name: 'Status',

  computed: {
      status() {
          return this.$store.getters['scrapyd/status'].toUpperCase()
      },
      host() {
          return this.$store.getters['scrapyd/host']
      },
      statusClass() {
          return this.status === 'OK' ? 'success' : 'danger'
      },
      scrapydUrl() {
          return settings.SCRAPYD_HOST
      }
  },

  created () {
      ScrapydAPI.status().then(response => {
        this.$store.dispatch('scrapyd/host', response.data.node_name)
        this.$store.dispatch('scrapyd/status', response.data.status)
        this.$store.dispatch('scrapyd/stats', {
            pending: response.data.pending,
            running: response.data.running,
            finished: response.data.finished
        })
      }).catch(e => {
        this.$store.commit('notifications/error', e)
      })
  }
}
</script>
