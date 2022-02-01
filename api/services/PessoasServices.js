const database = require('../models')
const Services = require ('./Services')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }   

    // métodos especificos do controlador de pessoas
    async listaRegistrosAtivos (where = {}){
        return database[this.nomeDoModelo].findAll({ where: { ...where }})
    }

    async listaTodos (where = {}){
        return database[this.nomeDoModelo]
        .scope ('todos')
        .findAll({ where: { ...where }})
    }

    async cancelaPessoaEMatriculas(idEstudante){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, idEstudante, { transaction: transacao})
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: idEstudante } , { transaction: transacao })
        })
    }
}

module.exports = PessoasServices