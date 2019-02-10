// main.js - A command proxy for convenience of CLI operation :)
require('dotenv').config() // import envvars from .env

const fs = require('fs')

const [namespaceAndAction = '', ...args] = process.argv.slice(2)
const [namespace, action] = namespaceAndAction.split(':')

function logFatal(message) {
  console.error(message)
  process.exit(1)
}

if (!namespace || !action) {
  logFatal('Usage: node main.js <namespace>:<action> [<arg1>, <arg2>, ...]')
}

if (!fs.existsSync(`${__dirname}/${namespace}.js`)) {
  logFatal(`No such namespace in tasks/ directory: ${namespace}.js`)
}
const actions = require(`./${namespace}.js`)

const command = actions[action]
if (!command) {
  logFatal(`No such action in ${namespace}.js: ${action}`)
}

// https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async/38510353#38510353
if (command[Symbol.toStringTag] === 'AsyncFunction') {
  command(args)
    .then(() => { process.exit(0) })
    .catch(e => { logFatal(e) })
} else {
  command(args)
  process.exit(0)
}
