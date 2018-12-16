<template>
    <div id="recent-entries">
        <b-list-group v-if="entries.length > 0">
            <b-list-group-item disabled class="sr-only">{{ $t('recent.header') }}</b-list-group-item>
            <b-list-group-item v-for="entry in entries" v-bind:key="entry.id" :href="entry.url" target="_blank">
                <h6 class="mb-0">{{ entry.title }}</h6>
                <small>{{ formatDate(entry.updated_at) }}</small>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import LibraryAPI from '@/api/library'
export default {
    name: 'recent',

    computed: {
        entries() {
            return this.$store.getters['library/recent']
        }
    },

    data() {
        return {
            limit: 5
        }
    },

    created() {
        this.updateRecent()
        this.$root.$on('trigger_update', this.updateRecent)
    },

    methods: {
        updateRecent() {
            LibraryAPI.recent(this.limit).then(response => {
                this.$store.dispatch('library/recent', response.data.results)
            }).catch(e => {
                this.$store.dispatch('notifications/error', e)
            })
        },
        formatDate: function(date) {
            return this.$moment.utc(date, 'YYYY-MM-DD hh:mm:ss.SSSSSS').fromNow();
        }
    }
}
</script>