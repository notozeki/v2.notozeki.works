const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')

const config = {
  dev: false,
}

const nuxt = new Nuxt(config)

exports.nuxt = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=60')
  return nuxt.render(req, res)
})
