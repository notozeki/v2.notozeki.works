<template>
  <div>
    ログインしています…
  </div>
</template>

<script>
import * as AuthService from '~/services/AuthService'

export default {
  mounted() {
    const link = window.location.href
    if (AuthService.isMailLinkSignIn(link)) {
      AuthService.completeMailLinkSignIn(link).then(() => {
        this.$router.replace('/')
        this.showSuccessMessage()
      }).catch(() => {
        this.$router.replace('/auth')
        this.showErrorMessage()
      })
    } else {
      this.$router.replace('/auth')
      this.showErrorMessage()
    }
  },
  notifications: {
    showSuccessMessage: {
      message: 'ログインしました',
      type: 'success',
    },
    showErrorMessage: {
      message: 'ログインリンクが無効です。もう一度ログインしてください',
      type: 'error',
    },
  },
}
</script>
