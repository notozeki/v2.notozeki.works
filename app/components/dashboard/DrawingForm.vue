<template>
  <form
    class="uk-card uk-card-default uk-grid-collapse uk-height-1-1"
    uk-grid
    @submit.prevent="handleSubmit"
  >
    <div
      class="uk-width-2-3@s uk-card-media-left uk-height-1-1"
      style="background: #555;"
    >
      <img
        :src="model.imageUrl"
        style="width: 100%; height: 100%; object-fit: contain;"
      >
    </div>
    <div class="uk-width-1-3@s uk-height-1-1 uk-overflow-auto">
      <div class="uk-padding-small">
        <div class="uk-marign">
          <label class="uk-form-label">キャプション</label>
          <textarea
            v-model="model.caption"
            class="uk-textarea"
            rows="3"
          />
        </div>
        <div class="uk-marign">
          <label class="uk-form-label">タグ</label>
          <input
            v-model="model.tags"
            type="text"
            class="uk-input"
          >
        </div>
        <div class="uk-marign">
          <label class="uk-form-label">制作日</label>
          <input
            v-model="model.createdAt"
            type="datetime-local"
            class="uk-input"
          >
        </div>
        <div class="uk-margin uk-flex uk-flex-between uk-flex-middle">
          <label v-if="!model.id">
            <input
              type="checkbox"
              class="uk-checkbox"
            >
            Twitterにも投稿する
          </label>
          <span v-else/><!--dummy-->

          <button
            :disabled="loading"
            type="submit"
            class="uk-button uk-button-primary"
          >
            <span v-if="model.id">
              {{ loading ? '更新中...' : '更新' }}
            </span>
            <span v-else>
              {{ loading ? '投稿中...' : '投稿' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Drawing from '@/models/Drawing'

export default {
  props: {
    drawing: { type: Drawing, required: true },
  },
  data() {
    return {
      model: { ...this.drawing },
      loading: false,
    }
  },
  watch: {
    drawing(val) {
      this.model = { ...val }
    },
  },
  methods: {
    handleSubmit() {
      this.loading = true
      this.$emit('submit', this.model, () => {
        this.loading = false
      })
    },
  },
}
</script>
