module.exports = {
  env: {
    browser: false,
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'max-len': ['error', {
      code: 110,
    }],
    'no-console': ['error', {
      allow: ['log', 'warn', 'error',],
    }],
  },
  settings: {
  },
}
