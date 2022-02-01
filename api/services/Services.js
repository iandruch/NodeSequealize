const database = require ('../models')

class Services {
    constructor (nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async listaTodosOsRegistros () {
        return database[this.nomeDoModelo].findAll()
    }

    async buscaPorId (id) {

    }

    async criaRegistro (dados) {

    }

    async atualizaRegistro (dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, {where: {id: id}}, transacao)
    }

    async atualizaRegistros (dadosAtualizados, where, transacao = {}){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, {where: {...where}}, transacao)
    }

    async apagaRegistro (id){

    }

    async encontraEContaRegistros(where = {}, agregadores){
        return database[this.nomeDoModelo]
            .findAndCountAll ({ where: { ...where}, ...agregadores })
    }


}

module.exports = Services