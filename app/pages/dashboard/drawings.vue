<template>
  <div>
    <section class="uk-padding uk-background-primary uk-light uk-container">
      <div class="uk-flex uk-flex-between uk-flex-middle">
        <h3 class="uk-margin-remove-bottom"><strong>Drawings</strong></h3>
        <a class="uk-button uk-button-primary uk-box-shadow-medium">
          <span uk-icon="icon: plus"/> New
        </a>
      </div>
    </section>
    <div class="uk-padding uk-container">
      <div
        v-for="i in images"
        :key="i.year"
      >
        <h4 class="uk-heading-divider uk-margin-medium">
          {{ i.year }}
          <small class="uk-text-muted">&nbsp;{{ i.items.length }} items</small>
        </h4>

        <div
          class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-small uk-margin-large-bottom"
          uk-grid
        >
          <a
            v-for="i in i.items"
            :key="i"
          >
            <div class="uk-card uk-card-default uk-card-small uk-card-hover">
              <div class="uk-card-media-top">
                <img
                  :src="i"
                  alt=""
                >
              </div>
              <div class="uk-card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data: () => ({
    // dummy
    images: [
      {
        year: 2019,
        items: [
          'https://pbs.twimg.com/media/DyfwhnBUUAEUObR?format=jpg&name=medium',
          'https://pbs.twimg.com/media/Dyft75KUYAAt96k?format=jpg&name=large',
          'https://pbs.twimg.com/media/DwuBgReVAAEZhub?format=jpg&name=medium',
          'https://pbs.twimg.com/media/Dwpo7d3U0AAzf2f?format=jpg&name=large',
          'https://pbs.twimg.com/media/DwkIP2cU8AA1KSi?format=jpg&name=large',
          'https://pbs.twimg.com/media/DwUpNDeVYAAH-N5?format=jpg&name=large',
        ],
      },
      {
        year: 2018,
        items: [
          'https://pbs.twimg.com/media/DvwLyHjVYAIWwtN?format=jpg&name=large',
          'https://pbs.twimg.com/media/Du30PykUcAAvLv8?format=jpg&name=large',
          'https://pbs.twimg.com/media/DueWZUvV4AAuuef?format=jpg&name=medium',
          'https://pbs.twimg.com/media/DtV51yiUUAA0Wg3?format=jpg&name=medium',
        ],
      },
    ],
  }),
}
</script>
