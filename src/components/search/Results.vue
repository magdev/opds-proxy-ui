<template>
    <div id="results" class="mt-4" ref="searchResults" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="perPage">
        <b-list-group>
            <b-list-group-item disabled class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ $t('search.results.header', { count: count }) }}</h5>
                    <small>{{ $t('search.results.page', { page: page, pages: pages }) }}</small>
                </div>
            </b-list-group-item>
            <b-list-group-item class="flex-column align-items-start" v-for="book in results" v-bind:key="book.id">
                <b-row>
                    <b-col sm="4" md="3" lg="2">
                        <a :href="book.url" target="_blank">
                            <img :src="book.image" class="img-fluid" :alt="book.title"/>
                        </a>
                    </b-col>
                    <b-col sm="8" md="9" lg="10">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">
                                <a :href="book.url" target="_blank">{{ book.title }}</a> <small class="text-muted"><em>(ISBN: {{ book.isbn }})</em></small>
                            </h5>
                            <small>{{ book.year }}</small>
                        </div>
                        <small class="simple-list text-muted">
                            <span v-for="author in book.authors" v-bind:key="author.id"><a :href="author.url" target="_blank">{{ author.name }}</a></span>
                        </small>
                        <p class="mb-1">
                            {{ book.summary }}
                        </p>
                        <small class="simple-list text-muted">
                            <span v-for="category in book.categories" v-bind:key="category.id"><a :href="category.url" target="_blank">{{ category.name }}</a></span>
                        </small>
                    </b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import InfiniteScroll from 'vue-infinite-scroll'

export default {
    name: 'results',

    directives: {
        InfiniteScroll
    },

    computed: {
        results() {
            return this.$store.getters['search/results']
        },
        count() {
            return this.$store.getters['search/count']
        },
        page() {
            return this.$store.getters['search/page']
        },
        pages() {
            return this.$store.getters['search/pages']
        },
        perPage() {
            return this.$store.getters['search/perPage']
        },
        nextPage() {
            return this.page++
        }
    },

    data() {
        return {
            busy: false
        }
    },

    methods: {
        loadMore() {
            this.$store.dispatch('search/page', this.nextPage)
            this.busy = true
            this.$root.$emit('perform_search')
        },
        pageBusyDisable() {
            this.busy = false
        }
    },

    created() {
        this.$root.$on('page_busy_disable', this.pageBusyDisable)
    }
}
</script>

<style lang="scss">
.simple-list {
    span, a {
        &:after {
            content: ' & ';
        }
        &:last-child {
            &:after {
                content: ''
            }
        }
    }
}
</style>
