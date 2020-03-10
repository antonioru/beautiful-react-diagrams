const { src, dest, parallel, series } = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postCSS = require('gulp-postcss');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

// source directory
const srcDir = '../src';

// destination directory
const destDir = '../dist';

/**
 * Transpile all javascript files within the /src directory using babel.
 * The test files (.spec.js) are excluded.
 */
const transpileJs = () => {
  const jsFiles = `${srcDir}/**/!(*.spec).js`;

  return src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      ignore: ['src/**/*.spec.js', 'src/**/*.test.js'],
      comments: false,
      plugins: [
        ['babel-plugin-transform-require-ignore', { extensions: ['.less', '.sass', '.scss', '.css'] }],
      ],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(destDir));
};

transpileJs.displayName = 'transpile';
transpileJs.description = 'Transpile javascript files';

/**
 * Build the CSS bundle
 */
const buildBundledStyle = () => {
  const cssFiles = `${srcDir}/**/*.scss`;

  return src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postCSS())
    .pipe(concat('beautiful-react-ui.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('..')); // css is saved into the root directory when published
};

buildBundledStyle.displayName = 'style bundle';
buildBundledStyle.description = 'Merge all styles within a single .css file';

/**
 * Build single components styles
 */
const buildComponentsStyles = () => {
  const cssFiles = `${srcDir}/components/**/*.scss`;

  return src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(`${destDir}/components`));
};

buildComponentsStyles.displayName = 'components style';
buildComponentsStyles.description = 'Build a stylesheet file for each component';

/**
 * Clean the destination folder before build
 */
const cleanDest = () => del([destDir], { force: true });

cleanDest.displayName = 'clean destination folder';
cleanDest.description = 'Remove all the previously built files';

// export tasks
module.exports.cleanDest = cleanDest;
module.exports.transpileJs = transpileJs;
module.exports.buildBundledStyle = buildBundledStyle;
module.exports.builComponentsStyles = buildComponentsStyles;

// default task
module.exports.default = series(cleanDest, parallel(transpileJs, buildComponentsStyles, buildBundledStyle));
