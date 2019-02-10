export default class Drawing {
  constructor({
    id = null,           // ?string
    imageUrl = null,     // ?string
    caption = '',        // string
    sourceUrl = null,    // ?Date
    createdAt = null,    // ?Date
    postedAt = null,     // ?Date
    tweetUrl = null,     // ?string
    tags = [],           // Array<string>
    enableTweet = false, // boolean
    image = null,        // ?File
  } = {}) {
    this.id = id
    this.imageUrl = imageUrl
    this.caption = caption
    this.sourceUrl = sourceUrl
    this.createdAt = createdAt
    this.postedAt = postedAt
    this.tweetUrl = tweetUrl
    this.tags = tags
    this.enableTweet = enableTweet
    this.image = image
  }
}
