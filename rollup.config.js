import glob from 'glob';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { version, dependencies, peerDependencies } from './package.json';

const name = 'beautiful-react-diagrams';
const banner = `/* ${name} version: ${version} */`;

const standardJSModulesOpts = {
  name,
  banner,
  exports: 'named',
  minifyInternalExports: true,
  preserveModules: true,
  globals: { react: 'React' },
};

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
const config = [
  {
    input: glob.sync('./src/**/*.js'),
    strictDeprecations: true,
    output: [
      {
        ...standardJSModulesOpts,
        dir: 'dist',
        format: 'cjs',
      },
      {
        ...standardJSModulesOpts,
        dir: 'dist/esm',
        format: 'esm',
      },
    ],
    external: Object.keys({ ...dependencies, ...peerDependencies }),
    plugins: [
      resolve(),
      babel({
        comments: false,
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      postcss({
        use: ['sass'],
        extract: 'styles.css',
      }),
    ],
  }];

export default config;
