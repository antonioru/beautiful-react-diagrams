/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-normalize')({ browsers: 'last 2 versions' }),
    require('postcss-preset-env')({ stage: 0 }),
    require('postcss-fixes'),
    require('postcss-will-change-transition'),
    require('postcss-will-change'),
    require('cssnano')({
      preset: 'default',
      safe: true, // I would recommend using cssnano only in safe mode
      calc: false, // calc is no longer necessary, as it is already done by postcss-fixes
    }),
  ],
};
