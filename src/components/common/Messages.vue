<template>
    <div id="messages">
        <b-alert class="mt-3" v-for="(msg, index) in messages" v-bind:key="index" :variant="msg.variant"
                 dismissible fade
                 :show="showMessages"
                 @dismissed="removeMessage(index)">
            {{ msg.message }}
        </b-alert>
    </div>
</template>

<script>
export default {
  name: 'Messages',

  computed: {
    messages() {
      return this.$store.getters['notifications/messages']
    },

    showMessages() {
      return this.$store.getters['notifications/messages'].length > 0
    }
  },

  methods: {
    removeMessage: function(index) {
      this.$store.dispatch('notifications/removeMessage', index)
    }
  }
}
</script>
