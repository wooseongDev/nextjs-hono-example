module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],

  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}
