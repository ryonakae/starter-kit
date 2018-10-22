module.exports = {
  extends: 'stylelint-config-standard',
  plugins: 'stylelint-order',
  rules: {
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': null,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true
  }
}
