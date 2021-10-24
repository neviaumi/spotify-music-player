module.exports = {
  customSyntax: require('@stylelint/postcss-css-in-js')(),
  extends: ['stylelint-config-styled-components'],
  plugins: ['stylelint-order'],
};
