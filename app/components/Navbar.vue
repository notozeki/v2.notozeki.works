<template>
  <nav
    class="uk-navbar-container"
    uk-navbar
  >
    <div class="uk-navbar-left">
      <nuxt-link
        v-if="backButtonRoute"
        :to="backButtonRoute"
        class="uk-navbar-item"
      >
        <span uk-icon="icon: arrow-left"/>
      </nuxt-link>
    </div>
    <div class="uk-navbar-center">
      <div class="uk-navbar-item">
        <nuxt-link
          to="/"
          class="logo uk-button uk-button-text"
        >
          <span class="notozeki">notozeki</span><span class="dot">.</span><span class="works">works</span> <span class="v2">v2</span>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    backButtonRoute: state => state.backButton.route,
  }),
}
</script>

<style lang="scss" scoped>
// WORKAROUND of an issue caused by combining .uk-navbar-left and .uk-navbar-center.
// See https://github.com/uikit/uikit/issues/2597
.uk-navbar-container {
  position: relative;
  min-height: 52px;
  height: 52px;
}

.logo {
  font-size: 1.3rem;
  color: #333;

  .notozeki {
    font-weight: 700;
    text-transform: uppercase;
  }

  .dot {
    display: none;
  }

  .works {
    font-weight: 200;
    text-transform: uppercase;
  }

  .v2 {
    font-size: 10px;
    text-transform: initial;
    color: #aaa;
  }
}
</style>
