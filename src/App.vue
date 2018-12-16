<template>
  <div id="opds-proxy-ui">
    <header>
      <b-navbar toggleable="md" type="dark" fixed variant="secondary">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand :to="{ name: 'home' }">{{ $t('app.name')}}</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'about' }">{{ $t('menu.about')}}</b-nav-item>
            <scrapyd-project-selector v-if="projects.length > 1"/>
            <b-nav-item v-else :to="{ name: 'scrapyd', params: { project: 'default' }}">{{ $t('menu.controller')}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main role="main">
      <b-container fluid class="mt-2 pb-5">
        <op-messages/>
        <router-view/>
        <op-statusbar/>
      </b-container>
    </main>
  </div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import ScrapydAPI from '@/api/scrapyd'
import ProjectSelector from '@/components/scrapyd/ProjectSelector'
import Statusbar from '@/components/common/Statusbar'
import settings from '@/settings'

export default {
  name: 'app',

  components: {
      'scrapyd-project-selector': ProjectSelector,
      'op-statusbar': Statusbar
  },

  computed: {
    status () {
      return this.$store.getters['scrapyd/status']
    },
    projects () {
      return this.$store.getters['scrapyd/projects']
    },
  },

  methods: {
    updateProjects: function() {
      ScrapydAPI.projects().then(response => {
        this.$store.dispatch('scrapyd/host', response.data.node_name)
        this.$store.dispatch('scrapyd/status', response.data.status)
        this.$store.dispatch('scrapyd/projects', response.data.projects)
        
        if (response.data.projects.length === 1) {
          this.$store.dispatch('scrapyd/project', response.data.projects[0])
        }
      }).catch(e => {
        this.$store.dispatch('notifications/error', e)
      })
    },

    triggerUpdate: function() {
       this.$root.$emit('trigger_update')
       setTimeout(this.triggerUpdate, settings.APP_UPDATE_INTERVAL)
    }
  },

  created () {
    this.$moment.locale(this.$i18n.locale())
    this.$store.dispatch('notifications/reset')
    setTimeout(this.triggerUpdate, settings.APP_UPDATE_INTERVAL)
  }
}
</script>
