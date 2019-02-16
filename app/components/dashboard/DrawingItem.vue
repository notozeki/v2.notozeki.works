<template>
  <div class="uk-card uk-card-default uk-card-small uk-card-hover">
    <a
      href="#"
      class="uk-display-block uk-card-media-top uk-height-medium image-container"
      @click.prevent="$emit('edit')"
    >
      <img
        :src="drawing.imageUrl"
        class="image-contain"
      >
    </a>
    <div class="uk-card-body uk-text-small">
      <div class="uk-flex uk-flex-between uk-flex-middle">
        <small class="uk-text-muted uk-flex-inline uk-flex-middle">
          <span uk-icon="icon: clock; ratio: 0.6"/>
          &nbsp;
          {{ formattedCreatedAt }}
        </small>

        <div class="uk-inline">
          <a
            href="#"
            class="uk-icon-link"
            uk-icon="icon: more-vertical; ratio: 0.8;"
          />
          <div
            id="menu"
            uk-dropdown="mode: click;"
          >
            <ul class="uk-nav uk-dropdown-nav">
              <li>
                <a
                  href="#menu"
                  uk-toggle
                  @click.prevent="$emit('edit')"
                >
                  <span uk-icon="pencil"/> 編集
                </a>
                <a
                  href="#menu"
                  class="uk-text-danger"
                  uk-toggle
                  @click.prevent="$emit('delete')"
                >
                  <span uk-icon="trash"/> 削除
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        v-if="drawing.caption"
        class="uk-margin-small-top"
      >
        {{ drawing.caption }}
      </div>
    </div>
  </div>
</template>

<script>
import Drawing from '@/models/Drawing'
import { formatDatetime } from '@/utils/time'

export default {
  props: {
    drawing: { type: Drawing, required: true },
  },
  computed: {
    formattedCreatedAt() {
      return formatDatetime(this.drawing.createdAt)
    },
  },
}
</script>

<style lang="scss" scoped>
.image-container {
  background-color: #555;
}
</style>
