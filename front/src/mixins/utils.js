import axiosZipcode from 'axios'
export default {
  methods: {
    /**
    * @description Verifica se o campo doc corresponde a um cpf.
    * @param {String} cpf Valor a ser verificado.
    */
    validateDoc(cpf) {
      if (cpf) {
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 ||
          cpf === '00000000000' ||
          cpf === '11111111111' ||
          cpf === '22222222222' ||
          cpf === '33333333333' ||
          cpf === '44444444444' ||
          cpf === '55555555555' ||
          cpf === '66666666666' ||
          cpf === '77777777777' ||
          cpf === '88888888888' ||
          cpf === '99999999999') { return false }
        let add = 0
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
        let rev = 11 - (add % 11)
        if (rev === 10 || rev === 11) { rev = 0 }
        if (rev !== parseInt(cpf.charAt(9))) return false
        add = 0
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
        rev = 11 - (add % 11)
        if (rev === 10 || rev === 11) rev = 0
        if (rev !== parseInt(cpf.charAt(10))) return false
        return true
      }
      return true
    },
    // validateCNPJ (cnpj) {
    //   cnpj = cnpj.replace(/[^\d]+/g, '')
    //   if (cnpj === '') return false
    //   if (cnpj.length !== 14) return false
    //   // Elimina CNPJs invalidos conhecidos
    //   if (cnpj === '00000000000000' ||
    //    cnpj === '11111111111111' ||
    //    cnpj === '22222222222222' ||
    //    cnpj === '33333333333333' ||
    //    cnpj === '44444444444444' ||
    //    cnpj === '55555555555555' ||
    //    cnpj === '66666666666666' ||
    //    cnpj === '77777777777777' ||
    //    cnpj === '88888888888888' ||
    //    cnpj === '99999999999999') {
    //     return false
    //   }
    //   // Valida DVs
    //   let tamanho = cnpj.length - 2
    //   let numeros = cnpj.substring(0, tamanho)
    //   let digitos = cnpj.substring(tamanho)
    //   let soma = 0
    //   let pos = tamanho - 7
    //   for (let i = tamanho; i >= 1; i--) {
    //     soma += numeros.charAt(tamanho - i) * pos--
    //     if (pos < 2) pos = 9
    //   }
    //   let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    //   if (resultado !== digitos.charAt(0)) {
    //     return false
    //   }
    //   tamanho = tamanho + 1
    //   numeros = cnpj.substring(0, tamanho)
    //   soma = 0
    //   pos = tamanho - 7
    //   for (let i = tamanho; i >= 1; i--) {
    //     soma += numeros.charAt(tamanho - i) * pos--
    //     if (pos < 2) pos = 9
    //   }
    //   resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    //   if (resultado !== digitos.charAt(1)) {
    //     return false
    //   }
    //   return true
    // },
    validateCNPJ(s) {
      let cnpj = s.replace(/[^\d]+/g, '')
      // Valida a quantidade de caracteres
      if (cnpj.length !== 14) return false

      // Elimina inválidos com todos os caracteres iguais
      if (/^(\d)\1+$/.test(cnpj)) return false

      // Cáculo de validação
      let t = cnpj.length - 2,
        d = cnpj.substring(t),
        d1 = parseInt(d.charAt(0)),
        d2 = parseInt(d.charAt(1)),
        calc = x => {
          let n = cnpj.substring(0, x),
            y = x - 7,
            s = 0,
            r = 0

          for (let i = x; i >= 1; i--) {
            s += n.charAt(x - i) * y--
            if (y < 2) y = 9
          }
          r = 11 - s % 11
          return r > 9 ? 0 : r
        }
      return calc(t) === d1 && calc(t + 1) === d2
    },
    uf() {
      return [
        { value: 'AC', label: 'AC' },
        { value: 'AL', label: 'AL' },
        { value: 'AM', label: 'AM' },
        { value: 'AP', label: 'AP' },
        { value: 'BA', label: 'BA' },
        { value: 'CE', label: 'CE' },
        { value: 'DF', label: 'DF' },
        { value: 'ES', label: 'ES' },
        { value: 'GO', label: 'GO' },
        { value: 'MA', label: 'MA' },
        { value: 'MG', label: 'MG' },
        { value: 'MS', label: 'MS' },
        { value: 'MT', label: 'MT' },
        { value: 'PA', label: 'PA' },
        { value: 'PB', label: 'PB' },
        { value: 'PE', label: 'PE' },
        { value: 'PI', label: 'PI' },
        { value: 'PR', label: 'PR' },
        { value: 'RJ', label: 'RJ' },
        { value: 'RN', label: 'RN' },
        { value: 'RO', label: 'RO' },
        { value: 'RR', label: 'RR' },
        { value: 'RS', label: 'RS' },
        { value: 'SC', label: 'SC' },
        { value: 'SP', label: 'SP' },
        { value: 'TO', label: 'TO' }
      ]
    },
    /**
    * @description Verifica a quantidade de digitos se for maior que 8,
    * acessamos uma api externa que retorna informações daquele cep e inserimos nos campos automáticamente.
    */
    searchZipcode(zipcode) {
      if (zipcode.length > 8) {
        this.$store.dispatch('SET_LOADING', true)
        axiosZipcode.get(`https://apps.widenet.com.br/busca-cep/api/cep/${zipcode}.json`)
          .then((response) => {
            return response
          })
          .catch(error => { throw new Error(error) })
      }
    },
    moneyToNumber: val => parseFloat(val.replace('R$ ', '').replace('US$ ', '').replace('.', '').replace(',', '.')),
    numberToMoney: (val, money) => {
      val = val.toFixed(2);
      val = val.replace(',', '').replace('.', ',');
      return money != '' && money != undefined ? `${money} ${val}` : `R$ ${val}`;
    },

    /**
    * @description Remove todos os caracteres especiais, espaços e deixa todos com caixa alta.
    * @param { Array } items 
    */
    removeCharSpecialsAndSpacesInObject(object) {
      return Object.keys(object).reduce((obj, index) => ({ ...obj, [index]: typeof object[index] == 'string' ? object[index].replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "").toUpperCase() : object[index] }), {});

    },

    /**
     * @description Percorre todos os objetos de um array e remove todos os caracteres especiais, espaços e deixa todos com caixa alta.
     * @param { Array } items 
     */
    removeCharSpecialsAndSpacesInArray(items) {
      return items.map((item) => {
        return this.removeCharSpecialsAndSpacesInObject(item)
      })
    },
    validaCpfCnpj(val) {
      if (val.length == 14) {
        var cpf = val.trim();

        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cpf.length > i; i++) {
          if (cpf[i - 1] != cpf[i]) {
            aux = true;
          }
        }

        if (aux == false) {
          return false;
        }

        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
          v1 += cpf[i] * p;
        }

        v1 = ((v1 * 10) % 11);

        if (v1 == 10) {
          v1 = 0;
        }

        if (v1 != cpf[9]) {
          return false;
        }

        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
          v2 += cpf[i] * p;
        }

        v2 = ((v2 * 10) % 11);

        if (v2 == 10) {
          v2 = 0;
        }

        if (v2 != cpf[10]) {
          console.log('cpf, false')
          return false;
        } else {
          console.log('cpf, true')
          return true;
        }
      } else if (val.length == 18) {
        var cnpj = val.trim();

        cnpj = cnpj.replace(/\./g, '');
        cnpj = cnpj.replace('-', '');
        cnpj = cnpj.replace('/', '');
        cnpj = cnpj.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cnpj.length > i; i++) {
          if (cnpj[i - 1] != cnpj[i]) {
            aux = true;
          }
        }

        if (aux == false) {
          return false;
        }

        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
          if (p1 >= 2) {
            v1 += cnpj[i] * p1;
          } else {
            v1 += cnpj[i] * p2;
          }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
          v1 = 0;
        } else {
          v1 = (11 - v1);
        }

        if (v1 != cnpj[12]) {
          return false;
        }

        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
          if (p1 >= 2) {
            v2 += cnpj[i] * p1;
          } else {
            v2 += cnpj[i] * p2;
          }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
          v2 = 0;
        } else {
          v2 = (11 - v2);
        }

        if (v2 != cnpj[13]) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
}
