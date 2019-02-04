<template>
  <div>
    <navbar />

    <aside>
      aside
    </aside>

    <main>
      <slot />
    </main>
  </div>
</template>

<script>
import DashboardNavbar from '~/components/DashboardNavbar'

export default {
  components: {
    navbar: DashboardNavbar,
  },
}
</script>
