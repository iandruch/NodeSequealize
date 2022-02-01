const database = require('../models')
const Services = require ('./Services')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
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

    

}

module.exports = MatriculasServices