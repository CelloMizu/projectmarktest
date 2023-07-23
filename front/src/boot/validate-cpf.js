import validateCPF from '../functions/validateCPF'

export default ({ Vue }) => {
    Vue.prototype.$validateCPF = validateCPF
}
