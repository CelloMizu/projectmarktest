import validateEmail from '../functions/validateEmail'

export default ({ Vue }) => {
    Vue.prototype.$validateEmail = validateEmail
}
