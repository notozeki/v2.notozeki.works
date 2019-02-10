const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const Twitter = require('twitter')
const request = require('request-promise-native')

const config = {
  dev: false,
}

const nuxt = new Nuxt(config)

exports.nuxt = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=60')
  return nuxt.render(req, res)
})

exports.createDrawingHook = functions.firestore
  .document('drawings/{drawingId}')
  .onCreate(async (snap, context) => {
    const drawing = snap.data()

    if (drawing.enableTweet && !drawing.tweetUrl) {
      // 1. Post to Twitter
      const twitter = new Twitter({
        consumer_key: functions.config().twitter.consumerkey,
        consumer_secret: functions.config().twitter.consumersecret,
        access_token_key: functions.config().twitter.accesstokenkey,
        access_token_secret: functions.config().twitter.accesstokensecret,
      })
      const imageData = await request(drawing.imageUrl, { encoding: null })
      const media = await twitter.post('media/upload', { media: imageData })
      const status = {
        status: `${drawing.caption}`, // TODO
        media_ids: media.media_id_string,
      }
      const tweet = await twitter.post('statuses/update', status)

      // 2. Store the tweet URL
      const tweetUrl = `https://twitter.com/notozeki/status/${tweet.id_str}`
      await snap.ref.set({ tweetUrl }, { merge: true })
    }
  })
