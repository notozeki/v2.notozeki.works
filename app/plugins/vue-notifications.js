import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import UIkit from 'uikit'

const notify = status => ({ title, message, type, timeout, cb }) => {
  UIkit.notification(message, {
    status,
    timeout,
    pos: 'bottom-right',
  })
}

const options = {
  success: notify('success'),
  error: notify('danger'),
  info: notify('primary'),
  warn: notify('warning'),
}

Vue.use(VueNotifications, options)
