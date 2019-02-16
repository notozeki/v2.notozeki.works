<template>
  <nav
    class="uk-navbar-container uk-background-primary uk-light uk-box-shadow-small"
    uk-navbar
  >
    <div class="uk-navbar-left">
      <nuxt-link
        to="/dashboard"
        class="uk-navbar-item uk-logo"
      >
        <img
          src="~/static/logo.png"
          width="32px"
        >
        &nbsp;
        <span class="logo">
          <span class="notozeki">NOTOZEKI</span><span class="works">WORKS</span>
        </span>
      </nuxt-link>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <a
            href="#"
            class="single-line"
          >
            <img
              v-if="currentUser.icon"
              :src="currentUser.icon"
              width="28px"
              class="uk-border-circle"
            >
            &nbsp;
            <span>{{ currentUser.email }}</span>
            <span uk-icon="icon: chevron-down" />
          </a>
          <div
            class="uk-navbar-dropdown"
            uk-dropdown="mode: click; offset: 0;"
          >
            <ul class="uk-nav uk-navbar-dropdown-nav uk-dark">
              <li>
                <a href="#todo">
                  ログアウト
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['currentUser']),
}
</script>

<style lang="scss" scoped>
@import "../../assets/palette";

.uk-navbar-container {
  background-color: $primary-color;
}

.logo {
  font-size: 1.2rem;
  color: #fff;

  .notozeki {
    font-weight: 700;
  }

  .works {
    font-weight: 200;
  }
}
</style>
