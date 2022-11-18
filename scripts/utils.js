const path = require('path')
const fs = require('fs')

const isVerbose = () => {
  const args = process.argv.slice(2)
  return args[0] === '-v'
}
module.exports.isVerbose = isVerbose

const joinPaths = (...args) => path.normalize(path.resolve(...args))
module.exports.joinPaths = joinPaths

const findInDir = (startPath, filter) => {
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath)
    return
  }
  const filenames = []

  const files = fs.readdirSync(startPath)
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i])
    var stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      return findInDir(filename, filter) //recurse
    } else if (filename.endsWith(filter)) {
      filenames.push(filename)
    }
  }

  return filenames
}
module.exports.findInDir = findInDir

const log = (...args) => {
  if (isVerbose()) {
    console.log('\x1b[36m%s\x1b[0m', ...args)
  }
}
module.exports.log = log
