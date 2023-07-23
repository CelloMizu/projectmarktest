export default {
  methods: {
    /**
    * @description Validação  generiica dos campos do administrador.
    * @param hasAdiministrator valor que verifica se o campo deve ou não ser requerido.
    * @param field  o campo que será verificados.
    */
    verifyFieldsAdministratorIsRequired (hasAdiministrator, field) {
      if (hasAdiministrator && !field) return false
      return true
    }
  }
}
