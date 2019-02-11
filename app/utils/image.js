import { readAsDataURL } from '@/utils/file'

class Rect {
  static copyFrom(rect) {
    return new Rect(rect.w, rect.h)
  }

  constructor(w, h) {
    this.w = w
    this.h = h
  }

  fitWidth(w) {
    const ratio = w / this.w
    this.w = w
    this.h = this.h * ratio
  }

  fitHeight(h) {
    const ratio = h / this.h
    this.w = this.w * ratio
    this.h = h
  }

  pixelize() {
    this.w = Math.round(this.w)
    this.h = Math.round(this.h)
  }
}

export function createImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = event => {
      resolve(event.target)
    }
    img.onerror = error => {
      reject(error)
    }
    img.src = src
  })
}

export async function resizeToFit(file, width, height) {
  const dataUrl = await readAsDataURL(file)
  const img = await createImg(dataUrl)
  const boundary = new Rect(width, height)
  const original = new Rect(img.naturalWidth, img.naturalHeight)

  if (original.w <= boundary.w && original.h <= boundary.h) {
    // No need to resize
    return file
  }

  const resized = Rect.copyFrom(original)
  if (resized.w > boundary.w) {
    resized.fitWidth(boundary.w)
  }
  if (resized.h > boundary.h) {
    resized.fitHeight(boundary.h)
  }
  resized.pixelize()

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = resized.w
    canvas.height = resized.h
    context.drawImage(
      img,
      0, 0, original.w, original.h,
      0, 0, resized.w, resized.h
    )
    canvas.toBlob(resolve)
  })
}
