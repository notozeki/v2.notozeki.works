export default class Drawing {
  constructor({
    id = null,
    imageUrl = null,
    caption = '',
    sourceUrl = null,
    createdAt = null,
    postedAt = null,
    tweetUrl = null,
    tags = [],
  } = {}) {
    this.id = id
    this.imageUrl = imageUrl
    this.caption = caption
    this.sourceUrl = sourceUrl
    this.createdAt = createdAt
    this.postedAt = postedAt
    this.tweetUrl = tweetUrl
    this.tags = tags
  }
}
