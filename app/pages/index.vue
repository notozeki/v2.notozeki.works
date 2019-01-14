<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        notozeki.works version 2
        <small class="wip">(WIP)</small>
      </h1>
      <h2 class="subtitle">
        Coming in Spring 2019.
      </h2>
      <div class="links">
        <a
          href="https://notozeki.works/"
          target="_blank"
          class="button--green">Current Version</a>
        <a
          href="https://github.com/notozeki/v2.notozeki.works"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 42px;
  color: #35495e;
  letter-spacing: 1px;
}

.wip {
  font-size: 60%;
  color: grey;
  vertical-align: middle;
}

.subtitle {
  font-weight: 300;
  font-size: 24px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
