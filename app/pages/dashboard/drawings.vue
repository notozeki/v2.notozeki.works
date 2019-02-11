<template>
  <div>
    <header class="uk-padding uk-background-primary uk-light uk-container">
      <div class="uk-flex uk-flex-between uk-flex-middle">
        <h3 class="uk-margin-remove-bottom"><strong>Drawings</strong></h3>
        <a
          href="#"
          class="uk-button uk-button-primary uk-box-shadow-medium"
          @click.prevent="showForm()"
        >
          <span uk-icon="icon: plus"/> New
        </a>
      </div>
    </header>

    <div
      v-if="!loading"
      class="uk-padding uk-container"
    >
      <div
        v-for="({ year, drawings }) in drawingsByYear"
        :key="year"
      >
        <h4 class="uk-heading-divider uk-margin-medium">
          {{ year }}
          <small class="uk-text-muted">&nbsp;{{ drawings.length }} items</small>
        </h4>

        <div
          class="uk-grid-small uk-grid-match uk-margin-large-bottom"
          uk-grid
        >
          <div
            v-for="drawing in drawings"
            :key="drawing.id"
            class="uk-width-1-1 uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l"
          >
            <drawing-item
              :drawing="drawing"
              @edit="showForm(drawing)"
              @delete="showDeleteDialog(drawing)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>loading...</p>
    </div>

    <div
      v-if="editingDrawing"
      ref="editModal"
      class="uk-modal-container"
      uk-modal
    >
      <div class="uk-modal-dialog uk-height-1-1">
        <button
          type="button"
          class="uk-modal-close-outside"
          uk-close
        />
        <drawing-form
          :drawing="editingDrawing"
          @submit="saveDrawing"
        />
      </div>
    </div>

    <div
      v-if="deletingDrawing"
      id="deleteModal"
      ref="deleteModal"
      uk-modal
    >
      <div class="uk-modal-dialog uk-modal-body">
        <drawing-delete
          :drawing="deletingDrawing"
          @delete="deleteDrawing"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrawingItem from '@/components/dashboard/DrawingItem'
import DrawingForm from '@/components/dashboard/DrawingForm'
import DrawingDelete from '@/components/dashboard/DrawingDelete'
import Drawing from '@/models/Drawing'

export default {
  layout: 'dashboard',
  components: {
    DrawingItem,
    DrawingForm,
    DrawingDelete,
  },
  data: () => ({
    editingDrawing: null,
    deletingDrawing: null,
  }),
  computed: mapState({
    drawingsByYear: state => {
      // FIXME: Very fat logic.
      const drawingsByYear = {}
      for (const d of state.dashboard.drawing.drawings) {
        const year = d.createdAt.getFullYear()
        if (!drawingsByYear[year]) {
          drawingsByYear[year] = []
        }
        drawingsByYear[year].push(d)
      }

      const years = Object.keys(drawingsByYear).sort().reverse()
      const drawingsByYearList = []
      for (const year of years) {
        drawingsByYearList.push({
          year,
          drawings: drawingsByYear[year],
        })
      }
      return drawingsByYearList
    },
    loading: state => state.dashboard.drawing.loading,
  }),
  mounted() {
    this.$store.dispatch('dashboard/drawing/fetchDrawings')
  },
  methods: {
    showForm(drawing = new Drawing()) {
      this.editingDrawing = drawing
      this.$nextTick(() => {
        this.$uikit.modal(this.$refs.editModal).show()
      })
    },
    saveDrawing(drawing, done) {
      this.$store.dispatch('dashboard/drawing/saveDrawing', { drawing }).then(({ newDoc }) => {
        if (newDoc) {
          this.showCreateSuccessMessage()
        } else {
          this.showUpdateSuccessMessage()
        }
        this.$uikit.modal(this.$refs.editModal).hide()
        done()
      }).catch(error => {
        console.error(error)
        this.showErrorMessage()
        done()
      })
    },
    showDeleteDialog(drawing) {
      this.deletingDrawing = drawing
      this.$nextTick(() => {
        this.$uikit.modal(this.$refs.deleteModal).show()
      })
    },
    deleteDrawing(drawing, done) {
      this.$store.dispatch('dashboard/drawing/deleteDrawing', { drawing }).then(() => {
        this.showDeleteSuccessMessage()
        this.$uikit.modal(this.$refs.deleteModal).hide()
        done()
      }).catch(error => {
        console.error(error)
        this.showErrorMessage()
        done()
      })
    },
  },
  notifications: {
    showCreateSuccessMessage: {
      message: 'おえかきを投稿しました🎉',
      type: 'success',
    },
    showUpdateSuccessMessage: {
      message: 'おえかきを更新しました💪',
      type: 'success',
    },
    showDeleteSuccessMessage: {
      message: 'おえかきを削除しました👋',
      type: 'success',
    },
    showErrorMessage: {
      message: 'エラーが発生しました😨<br>詳細はコンソールを見てください👀',
      type: 'error',
    },
  },
}
</script>
