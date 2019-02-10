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
          class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-small uk-grid-match uk-margin-large-bottom"
          uk-grid
        >
          <a
            v-for="drawing in drawings"
            :key="drawing.id"
            href="#"
            style="text-decoration: none;"
            @click.prevent="showForm(drawing)"
          >
            <div class="uk-card uk-card-default uk-card-small uk-card-hover">
              <div
                class="uk-card-media-top uk-height-medium"
                style="background: #555;"
              >
                <img
                  :src="drawing.imageUrl"
                  style="width: 100%; height: 100%; object-fit: contain;"
                >
              </div>
              <div class="uk-card-body uk-text-small">
                <small class="uk-text-muted uk-flex-inline uk-flex-middle">
                  <span uk-icon="icon: clock; ratio: 0.6"/>
                  &nbsp;
                  {{ formatTime(drawing.createdAt) }}
                </small>
                <p class="uk-margin-remove">{{ drawing.caption }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <p>loading...</p>
    </div>

    <div
      v-if="editingDrawing"
      ref="modal"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrawingForm from '@/components/dashboard/DrawingForm'
import Drawing from '@/models/Drawing'

export default {
  layout: 'dashboard',
  components: {
    DrawingForm,
  },
  data: () => ({
    editingDrawing: null,
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
        this.$uikit.modal(this.$refs.modal).show()
      })
    },
    async saveDrawing(drawing, done) {
      const timestamp = new Date()
      let newDoc = false

      if (!drawing.id) {
        drawing.id = timestamp.getTime()
        newDoc = true
      }
      if (!drawing.createdAt) {
        drawing.createdAt = timestamp
      }
      drawing.postedAt = timestamp

      this.$store.dispatch('dashboard/drawing/saveDrawing', { drawing }).then(() => {
        if (newDoc) {
          this.showCreateSuccessMessage()
        } else {
          this.showUpdateSuccessMessage()
        }
        this.$uikit.modal(this.$refs.modal).hide()
        done()
      }).catch(error => {
        console.error(error)
        if (newDoc) {
          this.showCreateErrorMessage()
        } else {
          this.showUpdateErrorMessage()
        }
        done()
      })
    },
    formatTime(date) {
      function pad(num) {
        if (num < 10) {
          return '0' + num
        } else {
          return '' + num
        }
      }

      return [
        date.getFullYear(),
        '/',
        pad(date.getMonth() + 1),
        '/',
        pad(date.getDate()),
        ' ',
        pad(date.getHours()),
        ':',
        pad(date.getMinutes()),
      ].join('')
    },
  },
  notifications: {
    showCreateSuccessMessage: {
      message: 'おえかきを投稿しました💪',
      type: 'success',
    },
    showCreateErrorMessage: {
      message: 'おえかきの投稿に失敗しました😨',
      type: 'error',
    },
    showUpdateSuccessMessage: {
      message: 'おえかきを更新しました💪',
      type: 'success',
    },
    showUpdateErrorMessage: {
      message: 'おえかきの更新に失敗しました😨',
      type: 'error',
    },
  },
}
</script>
