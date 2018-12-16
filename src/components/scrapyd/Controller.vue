<template>
    <div>
        <b-row>
            <b-col sm="12" md="4" lg="4" xl="3">
                <b-list-group>
                    <b-list-group-item disabled>{{ $t('scrapyd.spidersInProject', { project: project }) }}</b-list-group-item>
                    <b-list-group-item button @click.stop="scheduleSpider(spider)" v-for="(spider, index) in spiders" v-bind:key="index" :title="$t('scrapyd.notice.scheduleSpider')">
                        {{ spider }}
                    </b-list-group-item>
                </b-list-group>
                <op-recent class="mt-4"/>
                <op-stats class="mt-4"/>
            </b-col>
            <b-col sm="12" md="8" lg="8" xl="9">
                <b-table responsive small striped hover show-empty 
                    :empty-text="$t('scrapyd.status.noPendingJobs')" 
                    v-if="jobs.pending.length > 0"
                    caption-top :caption="$t('scrapyd.status.pendingJobs')"
                    @row-clicked="cancelJob"
                    :per-page="pagesize"
                    :items="jobs.pending"
                    :fields="fields.pending"
                    class="mt-0 mb-2">
                </b-table>
                <b-table responsive small striped hover show-empty 
                    :empty-text="$t('scrapyd.status.noRunningJobs')" 
                    v-if="jobs.running.length > 0"
                    caption-top :caption="$t('scrapyd.status.runningJobs')"
                    @row-clicked="cancelJob"
                    :per-page="pagesize"
                    :items="jobs.running"
                    :fields="fields.running"
                    :sort-by="sortBy"
                    :sort-desc="sortDesc"
                    class="mt-0 mb-2">
                </b-table>
                <b-table responsive small striped hover show-empty 
                    :empty-text="$t('scrapyd.status.noFinishedJobs')"
                    v-if="jobs.finished.length > 0" 
                    caption-top :caption="$t('scrapyd.status.finishedJobs')"
                    :per-page="pagesize"
                    :items="jobs.finished"
                    :fields="fields.finished"
                    :sort-by="sortBy"
                    :sort-desc="sortDesc"
                    class="mt-0 mb-2">
                </b-table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ScrapydAPI from '@/api/scrapyd'
import settings from '@/settings'

export default {
  name: 'controller',
  computed: {
      spiders () {
          return this.$store.getters['scrapyd/spiders']
      },
      project () {
          return this.$store.getters['scrapyd/project']
      },
      jobs () {
          return this.$store.getters['scrapyd/jobs']
      }
  },

  watch: {
    project (newProject, oldProject) {
        this.loadSpiders(newProject)
    }
  },

  methods: {
    loadSpiders: function(project) {
        ScrapydAPI.spiders(project).then(response => {
            this.$store.dispatch('scrapyd/host', response.data.node_name)
            this.$store.dispatch('scrapyd/status', response.data.status)
            this.$store.dispatch('scrapyd/spiders', response.data.spiders)
            this.$root.$emit('trigger_update')
        }).catch(e => {
            this.$store.dispatch('notifications/error', e)
        })
    },

    scheduleSpider: function(spider) {
        if (confirm(this.$t('scrapyd.notice.scheduleSpiderConfirm', { spider: spider }))) {
            ScrapydAPI.schedule(this.project, spider).then(response => {
                this.$store.dispatch('notifications/message', {
                    variant: 'success',
                    message: this.$t('scrapyd.notice.scheduled', { spider: spider, jobId: response.data.jobid })
                })
                setTimeout(() => {
                    this.$root.$emit('trigger_update')
                }, 3000)
            }).catch(e => {
                this.$store.dispatch('notifications/error', e)
            })
        }
    },

    cancelJob: function(item, index, event) {
        if (confirm(this.$t('scrapyd.notice.cancelJobConfirm', { jobId: item.id }))) {
             ScrapydAPI.cancel(this.project, item.id).then(response => {
                this.$store.dispatch('notifications/message', {
                    variant: 'info',
                    message: this.$t('scrapyd.notice.cancelJobConfirm', { jobId: item.id })
                })
                setTimeout(() => {
                    this.$root.$emit('trigger_update')
                }, 3000)
            }).catch(e => {
                this.$store.dispatch('notifications/error', e)
            })
        }
    },

    updateJobs: function() {
        ScrapydAPI.jobs(this.project).then(response => {
            this.$store.dispatch('scrapyd/host', response.data.node_name)
            this.$store.dispatch('scrapyd/status', response.data.status)
            this.$store.dispatch('scrapyd/jobs', {
                pending: response.data.pending,
                running: response.data.running,
                finished: response.data.finished,
            })
        }).catch(e => {
            this.$store.dispatch('notifications/error', e)
        })
    },

    formatDate: function(date) {
        return this.$moment.utc(date, 'YYYY-MM-DD hh:mm:ss.SSSSSS').fromNow();
    }
  },

  created () {
      this.loadSpiders(this.project)
      this.updateJobs()
      this.$root.$on('trigger_update', this.updateJobs)
  },

  beforeDestroy() {
  	  this.$root.$off('trigger_update', this.updateJobs);
  },

  data () {
    return {
      pagesize: settings.SCRAPYD_JOB_PAGESIZE,
      sortDesc: true,
      sortBy: 'start_time',
      fields: {
        pending: {
            spider: {
                label: this.$t('scrapyd.status.spider')
            },
            id: {
                label: this.$t('scrapyd.status.jobId')
            }
        },
        running: {
            spider: {
                label: this.$t('scrapyd.status.spider')
            },
            id: {
                label: this.$t('scrapyd.status.jobId')
            },
            start_time: {
                label: this.$t('scrapyd.status.started'),
                formatter: 'formatDate'
            },
            pid: {
                label: this.$t('scrapyd.status.pid')
            }
        },
        finished: {
            spider: {
                label: this.$t('scrapyd.status.spider')
            },
            id: {
                label: this.$t('scrapyd.status.jobId')
            },
            start_time: {
                label: this.$t('scrapyd.status.started'),
                formatter: 'formatDate'
            },
            end_time: {
                label: this.$t('scrapyd.status.finished'),
                formatter: 'formatDate'
            }
        }
      }
    }
  }
}
</script>
