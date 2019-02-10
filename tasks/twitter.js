const fs = require('fs')
const crypto = require('crypto')
const request = require('request-promise-native')

const firebase = require('firebase-admin')
firebase.initializeApp({
  credential: firebase.credential.cert(require(process.env.FIREBASE_CONFIG)),
  databaseURL: 'https://notozeki-works.firebaseio.com',
  storageBucket: 'notozeki-works.appspot.com',
})
const bucket = firebase.storage().bucket()

const Twitter = require('twitter')
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

// Utils
function md5hex(string) {
  const md5 = crypto.createHash('md5')
  return md5.update(string, 'binary').digest('hex')
}

async function getTweets(urls) {
  const ids = urls.map(url => url.split('/').slice(-1).pop())

  return new Promise((resolve, reject) => {
    twitter.get('statuses/lookup', { id: ids.join(','), trim_user: true }, (error, body, response) => {
      if (error) {
        reject(error)
        return
      }
      resolve(body)
    })
  })
}

async function uploadToGcs(path, data) {
  return new Promise((resolve, reject) => {
    const file = bucket.file(path)
    const stream = file.createWriteStream()

    stream.on('error', error => {
      reject(error)
    })

    stream.on('finish', () => {
      file.makePublic().then(() => {
        resolve(`https://storage.googleapis.com/notozeki-works.appspot.com/${path}`)
      })
    })

    stream.end(data)
  })
}

// Tasks
module.exports.import = async ([filename]) => {
  const urls = fs.readFileSync(filename, 'utf-8').split(/\n/).filter(s => !!s)
  const tweets = await getTweets(urls)

  const data = tweets.map(t => {
    const media = t.entities.media[0]
    const text = t.text.replace(media.url, '').trim()

    return {
      caption: text,
      imageUrl: media.media_url_https,
      createdAt: Date.parse(t.created_at),
      tweetUrl: `https://twitter.com/notozeki/status/${t.id_str}`,
    }
  })

  for (const d of data) {
    const id = d.createdAt

    // Upload image to GCS
    const imageData = await request(d.imageUrl, { encoding: null })
    const imageUrl = await uploadToGcs(`drawings/${id}/${md5hex(imageData)}.jpg`, imageData)

    // Create document on Firestore
    const ref = firebase.firestore().doc(`drawings/${id}`)
    const document = {
      imageUrl: imageUrl,
      caption: d.caption,
      sourceUrl: d.tweetUrl,
      createdAt: d.createdAt,
      postedAt: d.createdAt,
      tweetUrl: d.tweetUrl,
      tags: [],
    }
    await ref.set(document, { merge: true })

    console.log(`Document id=${id} is created with: ${JSON.stringify(document)}`)
  }
}
