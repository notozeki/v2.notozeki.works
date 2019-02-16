<template>
  <nav
    class="uk-navbar-container"
    uk-navbar
  >
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

<style lang="scss" scoped>
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
