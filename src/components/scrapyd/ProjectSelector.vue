<template>
    <b-nav-item-dropdown :text="$t('menu.projects')" right>
        <b-dropdown-item v-for="(project, index) in projects" v-bind:key="index" 
            :to="{ name: 'scrapyd', params: { project: project }}">
        {{ project }}
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>
export default {
    name: 'projectSelector',

    computed: {
        projects () {
            return this.$store.getters['scrapyd/projects']
        }
    }
}
</script>
