export default {
  methods: {
    /**
    * @description Validação  generiica dos campos do administrador.
    * @param allDay valor que verifica se o campo deve ou não ser requerido.
    * @param field  o campo que será verificados.
    */
    verifyFieldsAllDayIsRequired (allDay, field) {
      if (!allDay && !field) return false
      return true
    }
  }
}
