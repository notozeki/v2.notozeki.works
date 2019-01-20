<template>
  <div v-if="!error">
    ログインしています…
  </div>
  <div v-else>
    正しいリンクではありません。もう一度<nuxt-link to="/auth">ログイン</nuxt-link>してください。
  </div>
</template>

<script>
import * as AuthService from '~/services/AuthService'

export default {
  data: () => ({
    error: false,
  }),
  mounted() {
    if (AuthService.isMailLinkSignIn(window.location.href)) {
      AuthService.completeMailLinkSignIn(window.location.href).then(() => {
        this.$router.replace('/')
        alert('ログインしました')
      }).catch(() => {
        alert('エラーが発生しました')
      })
    } else {
      this.error = true
    }
  },
}
</script>
