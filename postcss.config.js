const path = require('path');

/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  plugins: [
    require('postcss-normalize')({ browsers: 'last 2 versions' }),
    require('postcss-preset-env')({ stage: 0 }),
    require('tailwindcss')(path.join(__dirname, './tailwind.default.config.js')),
    require('postcss-fixes'),
    require('postcss-will-change-transition'),
    require('postcss-will-change'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
      safe: true, // I would recommend using cssnano only in safe mode
      calc: false, // calc is no longer necessary, as it is already done by postcss-fixes
    }),
  ],
};
