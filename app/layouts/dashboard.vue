<template>
  <div v-if="currentUser && currentUser.isAdmin">
    <layout>
      <nuxt/>
    </layout>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as AccountService from '~/services/AccountService'
import Layout from '~/components/dashboard/Layout'

export default {
  components: {
    Layout,
  },
  computed: mapState(['currentUser']),
  mounted() {
    AccountService.onAccountChanged(user => {
      this.$store.commit('setCurrentUser', user)
    })
  },
}
</script>
