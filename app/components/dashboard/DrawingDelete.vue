<template>
  <div uk-grid>
    <div class="uk-width-1-1 uk-width-1-2@s uk-width-1-3@m">
      <img
        :src="drawing.imageUrl"
        class="image-contain"
      >
    </div>
    <div class="uk-width-1-1 uk-width-1-2@s uk-width-2-3@m">
      <div class="uk-flex uk-flex-column uk-flex-between uk-height-1-1">
        <div class="uk-alert uk-alert-danger">
          <h3>確認</h3>
          <p>
            このおえかきを削除してよろしいですか？
            <strong class="uk-text-danger">この操作は取り消せません！</strong>
          </p>
        </div>
        <footer class="uk-flex uk-flex-right">
          <a
            href="#deleteModal"
            class="uk-button uk-button-primary"
            uk-toggle
          >
            削除をやめる
          </a>
          &nbsp;
          <button
            :disabled="loading"
            type="button"
            class="uk-button uk-button-danger"
            @click="handleDelete"
          >
            {{ loading ? '削除中...' : '削除する' }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Drawing from '@/models/Drawing'

export default {
  props: {
    drawing: { type: Drawing, required: true },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    handleDelete() {
      this.loading = true
      this.$emit('delete', this.drawing, () => {
        this.loading = false
      })
    },
  },
}
</script>
