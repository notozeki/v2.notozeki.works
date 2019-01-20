<template>
  <form @submit.prevent="signin">
    <input
      v-model="email"
      type="email"
      required
    >
    <button
      :disabled="loading"
      type="submit"
    >ログイン/新規登録</button>
  </form>
</template>

<script>
import * as AuthService from '~/services/AuthService'

export default {
  data: () => ({
    email: '',
    loading: false,
  }),
  methods: {
    signin() {
      this.loading = true
      AuthService.sendSignInLink(this.email, `${window.location.origin}/auth/complete`).then(() => {
        this.loading = false
        this.email = ''
        alert('ログインリンクを送信しました')
      }).catch(error => {
        alert('エラーが発生しました')
      })
    },
  },
}
</script>
