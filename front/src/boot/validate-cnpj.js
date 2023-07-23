import validateCNPJ from '../functions/validateCNPJ'

export default ({ Vue }) => {
    Vue.prototype.$validateCNPJ = validateCNPJ
}
