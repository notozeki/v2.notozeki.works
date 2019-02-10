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
import Navbar from '~/components/dashboard/Navbar'
import Sidebar from '~/components/dashboard/Sidebar'

export default {
  components: {
    Navbar,
    Sidebar,
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
