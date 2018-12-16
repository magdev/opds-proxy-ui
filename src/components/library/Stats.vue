<template>
    <div id="stats">
        <b-list-group>
            <b-list-group-item disabled class="sr-only">{{ $t('stats.header') }}</b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ $t('stats.books') }} <b-badge variant="secondary" >{{ stats.books }}</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ $t('stats.authors') }} <b-badge variant="secondary">{{ stats.authors }}</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ $t('stats.categories') }} <b-badge variant="secondary">{{ stats.categories }}</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ $t('stats.links') }} <b-badge variant="secondary">{{ stats.links }}</b-badge>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import LibraryAPI from '@/api/library'

export default {
  name: 'stats',

  computed: {
      stats () {
          return this.$store.getters['library/stats']
      }
  },

  methods: {
      updateStats: function() {
          LibraryAPI.stats().then(response => {
              this.$store.dispatch('library/stats', response.data)
          }).catch(e => {
              this.$store.dispatch('notifications/error', e)
          })
      }
  },

  created () {
      this.updateStats()
      this.$root.$on('trigger_update', this.updateStats)
  },

  beforeDestroy() {
  	  this.$root.$off('trigger_update', this.updateStats);
  }
}
</script>