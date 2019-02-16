<template>
  <div
    class="uk-section uk-section-muted"
    style="padding-top: 10px;"
    uk-height-viewport="offset-top: 52px"
  >
    <div class="uk-container">
      <div
        class="uk-grid-small"
        uk-grid="masonry: true"
      >
        <div
          v-for="d in drawings"
          :key="d.id"
          class="uk-width-1-2 uk-width-1-4@s uk-width-1-6@m"
        >
          <nuxt-link
            :to="`/drawings/${d.id}`"
            class="uk-inline uk-box-shadow-hover-large"
          >
            <img :src="d.imageUrl">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    if (store.state.drawing.drawings.length === 0) {
      await store.dispatch('drawing/fetchDrawings')
    }
  },
  computed: mapState({
    drawings: state => state.drawing.drawings,
  }),
}
</script>
