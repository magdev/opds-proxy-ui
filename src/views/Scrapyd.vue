<template>
    <div id="controller">
        <scrapyd-controller/>
    </div>
</template>

<script>
import Controller from '@/components/scrapyd/Controller'

export default {
  name: 'scrapyd',

  components: {
      'scrapyd-controller': Controller,
  },
  
}
</script>
