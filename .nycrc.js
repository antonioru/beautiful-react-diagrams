module.exports = {
  'extends': '@istanbuljs/nyc-config-typescript',
  'check-coverage': true,
  'all': true,
  'include': [
    'src/**/!(*.test.*).[tj]s?(x)'
  ],
  'exclude': [
    'tests/**/*.*',
    'stories/**/*.*'
  ],
  'reporter': [
    'html',
    'lcov',
    'text',
    'text-summary'
  ],
  'report-dir': 'coverage'
}
