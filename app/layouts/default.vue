<template>
  <layout>
    <nuxt/>
  </layout>
</template>

<script>
import * as AccountService from '@/services/AccountService'
import Layout from '@/components/Layout'

export default {
  middleware: 'backButton',
  components: {
    Layout,
  },
  mounted() {
    AccountService.onAccountChanged(user => {
      this.$store.commit('setCurrentUser', user)
    })
  },
}
</script>
