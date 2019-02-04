<template>
  <div v-if="currentUser && currentUser.isAdmin">
    <dashboard-layout>
      <nuxt/>
    </dashboard-layout>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as AccountService from '~/services/AccountService'
import DashboardLayout from '~/components/DashboardLayout'

export default {
  components: {
    DashboardLayout,
  },
  computed: mapState(['currentUser']),
  mounted() {
    AccountService.onAccountChanged(user => {
      this.$store.commit('setCurrentUser', user)
    })
  },
}
</script>
