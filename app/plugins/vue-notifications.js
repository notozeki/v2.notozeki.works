import Vue from 'vue'
import VueNotifications from 'vue-notifications'

// TODO: Implement seriously.
const notify = ({ title, message, type, timeout, cb }) => {
  alert(message)
}

const options = {
  success: notify,
  error: notify,
  info: notify,
  warn: notify,
}

Vue.use(VueNotifications, options)
