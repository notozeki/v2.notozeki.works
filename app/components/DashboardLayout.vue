<template>
  <div id="dashboard">
    <navbar id="navbar"/>
    <sidebar id="sidebar"/>
    <main id="main">
      <slot/>
    </main>
  </div>
</template>

<script>
import DashboardNavbar from '~/components/DashboardNavbar'
import DashboardSidebar from '~/components/DashboardSidebar'

export default {
  components: {
    navbar: DashboardNavbar,
    sidebar: DashboardSidebar,
  },
}
</script>

<style lang="scss" scoped>
#dashboard {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid:
    " navbar  navbar" 52px
    " sidebar main  " 1fr
    / 256px   1fr;
}

#navbar {
  grid-area: navbar;
}

#sidebar {
  grid-area: sidebar;
}

#main {
  grid-area: main;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
