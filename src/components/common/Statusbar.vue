<template>
     <div class="navbar fixed-bottom navbar-light bg-light py-1">
         <scrapyd-status class="ml-auto"/>
     </div>
</template>

<script>
import Status from '@/components/scrapyd/Status'

export default {
    name: 'statusbar',

    components: {
      'scrapyd-status': Status,
    }
}
</script>
