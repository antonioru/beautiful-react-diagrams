module.exports = {
  extension: ['ts', 'tsx'],
  require: [
    'tests/setup/compiler.js',
    'global-jsdom/register',
    'ignore-styles'
  ],
  spec: 'tests/**/*.spec.+(ts|tsx)',
}
