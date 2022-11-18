const ts = require('ts-node')

const tsConfigFile = './tsconfig.tests.json'

/* eslint-disable-next-line no-console */
console.log(`'Setting up mocha with typescript configuration: '${tsConfigFile}'`)

ts.register({
  project: tsConfigFile
})
