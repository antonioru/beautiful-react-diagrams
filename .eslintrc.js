module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    semi: ['error', 'never'],
    'max-len': ['error', { code: 140 }],
    'no-restricted-exports': 'off',
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'no-unused-vars': 'off',
  },
  overrides: [
    /**
     * Stories overrides
     */
    {
      files: ['stories/*.stories.ts', 'stories/*.stories.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    },
    /**
     * Tests overrides
     */
    {
      files: ['tests/**/*.ts', 'tests/**/*.tsx'],
      env: {
        browser: true,
        es2021: true,
        mocha: true
      },
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
}
