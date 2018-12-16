<template>
    <div id="searchbox" @keydown.enter="performQuery()">
        <b-input-group :prepend="$t('search.box.prefix')">
            <b-form-input type="text" v-model="q" :placeholder="$t('search.box.placeholder')"></b-form-input>
            <b-input-group-append>
                <b-btn variant="secondary" @click="performQuery()">
                    {{ $t('search.box.button') }}
                </b-btn>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
import SearchAPI from '@/api/search'

export default {
    name: 'searchbox',

    data() {
        return {
            q: ''
        }
    },

    computed: {
        query() {
            return this.$data.q
        },
        page() {
            return this.$store.getters['search/page']
        }
    },

    methods: {
        performQuery: function() {
            if (this.query) {
                SearchAPI.query(this.query, this.page).then(response => {
                    this.$store.dispatch('search/results', response.data.results)
                    this.$store.dispatch('search/page', response.data.page)
                    this.$store.dispatch('search/pages', response.data.pages)
                    this.$store.dispatch('search/perPage', response.data.perPage)
                    this.$store.dispatch('search/count', response.data.count)
                    this.$store.dispatch('search/query', response.data.query)
                    if (response.data.count >= 1) {
                        this.$root.$emit('page_busy_disable')
                        if (this.$route.name != 'search') {
                            this.$router.push('search')
                        }
                    } else {
                        this.$store.dispatch('notifications/message', {
                            variant: 'info',
                            message: this.$t('search.results.empty')
                        })
                    }
                }).catch(e => {
                    this.$store.dispatch('notifications/error', e)
                })
            } else {
                this.$store.dispatch('notifications/message', {
                    variant: 'danger',
                    message: this.$t('search.results.noQuery')
                })
            }
        }
    },

    created() {
        this.q = this.$store.getters['search/query']
        this.$store.dispatch('search/page', 1)
        this.$root.$on('perform_search', this.performQuery)
    }
}
</script>
