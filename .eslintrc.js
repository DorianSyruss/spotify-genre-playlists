module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@extensionengine',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['require-sort', '@typescript-eslint'],
  rules: {
    'require-sort/require-sort': ['error', {
      ignoreCase: true,
      propertySyntaxSortOrder: ['multiple', 'single', 'none']
    }]
  }
};
