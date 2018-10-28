module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: 'stylelint-order',
  rules: {
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': null,
    'order/properties-alphabetical-order': true
  }
}
