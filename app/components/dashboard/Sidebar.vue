<template>
  <aside class="sidebar uk-light">
    <h3 class="sidebar-section title">
      Dashboard
    </h3>
    <ul class="sidebar-section uk-nav uk-nav-default">
      <li class="uk-nav-header">Contents</li>
      <nuxt-link
        to="/dashboard/drawings"
        tag="li"
        active-class="uk-active"
      >
        <a><span uk-icon="icon: pencil"/> Drawings</a>
      </nuxt-link>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: #263238;
}

.sidebar-section {
  border-bottom: 1px solid #546E7A;
}

.title {
  margin: 0;
  padding: 12px 15px;
  font-size: 1.1rem;
}

.uk-nav.sidebar-section {
  padding: 8px 0;

  > li > a {
    padding: 10px 15px;
  }

  .uk-nav-header {
    padding: 6px 15px;
    margin: 0;
  }
}

</style>
