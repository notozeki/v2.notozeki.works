<template>
  <form
    class="uk-card uk-card-default uk-grid-collapse uk-height-1-1"
    uk-grid
    @submit.prevent="handleSubmit"
  >
    <div class="uk-width-2-3@s uk-card-media-left uk-height-1-1 image-container">
      <button
        v-if="model.imageFile"
        type="button"
        class="image-remove-button"
        @click="detachImage"
      >
        <span uk-icon="icon: close; ratio: 1.5;"/>
      </button>
      <img
        v-if="previewUrl || model.imageUrl"
        :src="previewUrl || model.imageUrl"
        class="image-contain"
      >
      <input
        v-else
        type="file"
        accept="image/*"
        @change="attachImage"
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
          <label class="uk-form-label">引用元</label>
          <input
            v-model="model.sourceUrl"
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
              v-model="model.enableTweet"
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
import ImageFile from '@/models/ImageFile'

function formize(drawing) {
  return {
    ...drawing,
    createdAt: drawing.createAt ? drawing.createdAt.toISOString().slice(0, 19) : null,
    tags: drawing.tags.join(', '),
    imageFile: null,
  }
}

function deformize(model) {
  return new Drawing({
    ...model,
    createdAt: model.createdAt ? new Date(Date.parse(model.createdAt)) : null,
    tags: model.tags.split(',').map(s => s.trim()).filter(s => !!s),
  })
}

export default {
  props: {
    drawing: { type: Drawing, required: true },
  },
  data() {
    return {
      model: formize(this.drawing),
      previewUrl: null,
      loading: false,
    }
  },
  watch: {
    drawing(val) {
      this.model = formize(val)
      this.previewUrl = null
    },
  },
  methods: {
    attachImage(event) {
      const file = event.target.files[0]
      this.model.imageFile = new ImageFile(file)
      this.model.imageFile.toDataUrl().then(dataUrl => {
        this.previewUrl = dataUrl
      })
    },
    detachImage() {
      this.model.imageFile = null
      this.previewUrl = null
    },
    handleSubmit() {
      this.loading = true
      this.$emit('submit', deformize(this.model), () => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  background-color: #555;
}

.image-remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border: none;
  border-radius: 500px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
