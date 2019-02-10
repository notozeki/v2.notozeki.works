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

    <div class="uk-padding uk-container">
      <div
        v-for="({ year, drawings }) in drawingsByYear"
        :key="year"
      >
        <h4 class="uk-heading-divider uk-margin-medium">
          {{ year }}
          <small class="uk-text-muted">&nbsp;{{ drawings.length }} items</small>
        </h4>

        <div
          class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-small uk-margin-large-bottom"
          uk-grid
        >
          <a
            v-for="drawing in drawings"
            :key="drawing.id"
            href="#"
            @click.prevent="showForm(drawing)"
          >
            <div class="uk-card uk-card-default uk-card-small uk-card-hover">
              <div class="uk-card-media-top">
                <img :src="drawing.imageUrl">
              </div>
              <div class="uk-card-body">
                <p>{{ drawing.caption }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
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
import DrawingForm from '@/components/dashboard/DrawingForm'
import Drawing from '@/models/Drawing'

export default {
  layout: 'dashboard',
  components: {
    DrawingForm,
  },
  data: () => ({
    // dummy
    drawingsByYear: [
      {
        year: 2019,
        drawings: [
          new Drawing({
            id: 'https://pbs.twimg.com/media/Dy-m3z9VsAAQqR3?format=jpg&name=medium',
            imageUrl: 'https://pbs.twimg.com/media/Dy-m3z9VsAAQqR3?format=jpg&name=medium',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/DyfwhnBUUAEUObR?format=jpg&name=medium',
            imageUrl: 'https://pbs.twimg.com/media/DyfwhnBUUAEUObR?format=jpg&name=medium',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/Dyft75KUYAAt96k?format=jpg&name=large',
            imageUrl: 'https://pbs.twimg.com/media/Dyft75KUYAAt96k?format=jpg&name=large',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/DwuBgReVAAEZhub?format=jpg&name=medium',
            imageUrl: 'https://pbs.twimg.com/media/DwuBgReVAAEZhub?format=jpg&name=medium',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/Dwpo7d3U0AAzf2f?format=jpg&name=large',
            imageUrl: 'https://pbs.twimg.com/media/Dwpo7d3U0AAzf2f?format=jpg&name=large',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/DwkIP2cU8AA1KSi?format=jpg&name=large',
            imageUrl: 'https://pbs.twimg.com/media/DwkIP2cU8AA1KSi?format=jpg&name=large',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/DwUpNDeVYAAH-N5?format=jpg&name=large',
            imageUrl: 'https://pbs.twimg.com/media/DwUpNDeVYAAH-N5?format=jpg&name=large',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
        ],
      },
      {
        year: 2018,
        drawings: [
          new Drawing({
            id: 'https://pbs.twimg.com/media/DvwLyHjVYAIWwtN?format=jpg&name=large',
            imageUrl: 'https://pbs.twimg.com/media/DvwLyHjVYAIWwtN?format=jpg&name=large',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/Du30PykUcAAvLv8?format=jpg&name=large',
            imageUrl: 'https://pbs.twimg.com/media/Du30PykUcAAvLv8?format=jpg&name=large',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/DueWZUvV4AAuuef?format=jpg&name=medium',
            imageUrl: 'https://pbs.twimg.com/media/DueWZUvV4AAuuef?format=jpg&name=medium',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
          new Drawing({
            id: 'https://pbs.twimg.com/media/DtV51yiUUAA0Wg3?format=jpg&name=medium',
            imageUrl: 'https://pbs.twimg.com/media/DtV51yiUUAA0Wg3?format=jpg&name=medium',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          }),
        ],
      },
    ],
    editingDrawing: null,
  }),
  methods: {
    showForm(drawing = new Drawing()) {
      this.editingDrawing = drawing
      this.$nextTick(() => {
        this.$uikit.modal(this.$refs.modal).show()
      })
    },
    saveDrawing(drawing, done) {
      // TODO
      setTimeout(done, 1000)
    },
  },
}
</script>
