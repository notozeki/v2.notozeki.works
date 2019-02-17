<template>
  <div
    class="uk-section uk-section-small uk-section-muted uk-padding-remove-top uk-flex uk-flex-wrap"
    uk-height-viewport="offset-top: 52px"
  >
    <div
      class="uk-width-1-1 uk-width-2-3@m uk-width-3-4@l uk-flex uk-flex-middle uk-flex-center"
    >
      <img
        :src="drawing.imageUrl"
        class="image"
      >
    </div>
    <div class="uk-width-1-1 uk-width-1-3@m uk-width-1-4@l uk-padding-small uk-padding-remove-right">
      <div
        v-if="drawing.caption"
        class="box"
      >
        <span v-html="renderedCaption"/>
      </div>

      <div class="box">
        <div class="metadata">
          <div class="metadata-entry">
            <span>createdAt:</span>
            <span>{{ formattedCreatedAt }}</span>
          </div>
          <div
            v-if="drawing.tweetUrl"
            class="metadata-entry"
          >
            <span>share:</span>
            <span>
              <a
                :href="drawing.tweetUrl"
                target="_blank"
              >
                Twitter
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDatetime } from '@/utils/time'

export default {
  head() {
    return {
      meta: [
        // Twitter Cards tags
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:description', name: 'twitter:description', content: this.drawing.caption },
        { hid: 'twitter:image', name: 'twitter:image', content: this.drawing.imageUrl },

        // OGP tags
        { hid: 'og:description', property: 'og:description', content: this.drawing.caption },
        { hid: 'og:image', property: 'og:image', content: this.drawing.imageUrl },
      ],
    }
  },
  async asyncData({ store, params, error }) {
    const drawing = await store.dispatch('drawing/fetchDrawing', { drawingId: params.id })
    if (drawing) {
      return { drawing }
    } else {
      error({ statusCode: 404, message: 'Not Found' })
    }
  },
  computed: {
    formattedCreatedAt() {
      return formatDatetime(this.drawing.createdAt)
    },
    renderedCaption() {
      return this.drawing.caption.replace(/\n/g, '<br>')
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Inconsolata');

.image {
  max-height: 85vh;
}

.box {
  margin-bottom: 15px;
  padding: 10px 15px;
  background: #fff;
}

.metadata {
  display: table;
  color: #888;

  .metadata-entry {
    display: table-row;

    > * {
      display: table-cell;

      &:nth-child(1) {
        font-family: Inconsolata, monospace;
        color: #aaa;
      }

      &:nth-child(2) {
      }
    }
  }
}
</style>
