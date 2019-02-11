function createReader(handleSuccess, handleError) {
  const reader = new FileReader()
  reader.onload = event => {
    handleSuccess(event.target.result)
  }
  reader.onerror = error => {
    handleError(error)
  }
  return reader
}

export function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = createReader(resolve, reject)
    reader.readAsDataURL(file)
  })
}

export function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = createReader(resolve, reject)
    reader.readAsArrayBuffer(file)
  })
}
