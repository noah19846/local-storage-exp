let prettierRule = {}

try {
  // eslint-disable-next-line global-require
  prettierRule = require('./.prettierrc.json')
} catch (_) {
  //
}

module.exports = {
  extends: ['kisama'],

  rules: {
    'prettier/prettier': ['error', prettierRule],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  }
}
