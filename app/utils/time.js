export function formatDatetime(date) {
  function pad2(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return '' + num
    }
  }

  return [
    date.getFullYear(),
    '-',
    pad2(date.getMonth() + 1),
    '-',
    pad2(date.getDate()),
    ' ',
    pad2(date.getHours()),
    ':',
    pad2(date.getMinutes()),
  ].join('')
}
