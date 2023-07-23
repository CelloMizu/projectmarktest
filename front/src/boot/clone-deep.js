import cloneDeep from 'clone-deep'

export default ({ Vue }) => {
  Vue.prototype.$cloneDeep = cloneDeep
}
