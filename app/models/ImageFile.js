import md5 from 'js-md5'
import { readAsDataURL, readAsArrayBuffer } from '@/utils/file'
import { resizeToFit } from '@/utils/image'

export default class ImageFile {
  constructor(file) {
    this.file = file
  }

  get extname() {
    return this.file.name.split('.').pop()
  }

  async toDataUrl() {
    return await readAsDataURL(this.file)
  }

  async calculateDigest() {
    const arrayBuffer = await readAsArrayBuffer(this.file)
    return md5(arrayBuffer)
  }

  async resizeToFit(width, height) {
    return await resizeToFit(this.file, width, height)
  }
}
