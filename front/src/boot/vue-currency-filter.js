import VueCurrencyFilter from 'vue-currency-filter'

export default ({ app, router, Vue }) => {
  Vue.use(VueCurrencyFilter, 
  {
    symbol : 'R$', 
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })
}
