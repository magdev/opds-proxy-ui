<template>
    <div id="about" class="container">
        <b-row class="mt-3">
            <b-col tag="article" sm="12" md="7">
                <h1 class="display-4 mb-4" v-if="$t('about.header')">{{ $t('about.header') }}</h1>
                <p class="lead" v-if="$t('about.lead')">{{ $t('about.lead') }}</p>
                <vue-markdown v-if="$t('about.body')" :source="$t('about.body')"></vue-markdown>
            </b-col>
            <b-col tag="aside" sm="12" md="5" class="mt-5">
                <vue-markdown v-if="$t('about.aside')" :source="$t('about.aside')"></vue-markdown>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
    name: 'about',
    components: {
        VueMarkdown
    },
}
</script>
