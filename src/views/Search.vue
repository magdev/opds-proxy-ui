<template>
    <b-container id="search" class="mt-4">
        <op-searchbox/>
        <op-results/>
    </b-container>
</template>

<script>
import Searchbox from '@/components/search/Searchbox'
import Results from '@/components/search/Results'

export default {
    name: 'search',

    components: {
        'op-searchbox': Searchbox,
        'op-results': Results
    }
}
</script>
