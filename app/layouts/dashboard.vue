<template>
  <div v-if="currentUser && currentUser.isAdmin">
    <h1>ダッシュボード</h1>

    <nuxt/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as AccountService from '~/services/AccountService'

export default {
  computed: mapState(['currentUser']),
  mounted() {
    AccountService.onAccountChanged(user => {
      this.$store.commit('setCurrentUser', user)
    })
  },
}
</script>
