export default {
  methods: {
    /**
    * @description Validação para bloquear somente o campo image quando for um cadastro (post).
    * @param routeId Verifica se existe um id na rota.
    * @param image  Verifica se existe imagem.
    */
    verifyFieldImageIsRequired (routeId, image) {
      if (!routeId && !image) return false
      return true
    }
  }
}
