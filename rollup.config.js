import path from 'path'
import glob from 'glob'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import ignoreImport from 'rollup-plugin-ignore-import'
import { peerDependencies, version } from './package.json'

const libName = 'beautiful-react-diagrams'
const banner = `/* ${libName} version: ${version} */`
const srcFolder = path.join(__dirname, 'src')
const distFolder = path.join(__dirname, 'dist')
const files = glob.sync(`${srcFolder}/**/*.+(ts|tsx)`)
const externals = Object.keys(peerDependencies)
const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default [
  /**
   * The following configuration transpiles typescript files
   * into JS files using Babel as well as produces a single
   * style bundle.
   * Keep in mind this configuration does not type check your code.
   * The type checking script is defined in package.json file.
   */
  {
    input: files,
    external: externals,
    output: {
      banner,
      name: libName,
      dir: distFolder,
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true
    },
    plugins: [
      del({ targets: 'dist/*' }),
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        extensions,
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript'
        ],
        plugins: ['babel-plugin-jsx-remove-data-test-id']
      }),
      postcss({
        extensions: ['.css', '.scss'],
        use: ['sass'],
        minimize: true,
        extract: 'styles.bundle.css'
      })
    ]
  },
  /**
   * The following configuration generates typescript declaration files
   * only (.t.ds) whilst ignoring the scss/css files.
   * The produced declaration files include the style imports.
   * Stripping out the style imports (in case you want to) is out of the
   * following configuration scope.
   */
  {
    input: files,
    external: externals,
    output: {
      banner,
      name: libName,
      dir: distFolder,
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      ignoreImport({ include: ['**/*.scss', '**/*.css'] }),
      typescript({
        compilerOptions: {
          declaration: true,
          emitDeclarationOnly: true,
          declarationDir: './dist'
        }
      })
    ]
  }
]
