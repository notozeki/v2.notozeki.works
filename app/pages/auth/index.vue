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
        this.showSuccessMessage()
      }).catch(error => {
        this.loading = false
        this.showErrorMessage()
      })
    },
  },
  notifications: {
    showSuccessMessage: {
      message: 'ログインリンクを送信しました',
      type: 'success',
    },
    showErrorMessage: {
      message: 'ログイン中にエラーが発生しました。もう一度お試しください',
      type: 'error',
    },
  },
}
</script>
