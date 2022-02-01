//const database = require ('../models')
const Services = require ('../services/Services')
const niveisServices = new Services ('Niveis')

class NivelController {
 
    static async listaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await niveisServices.listaTodosOsRegistros ()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async buscaNivelPorId (req, res){
      const { id } = req.params
      try{
          const umNivel = await database.Niveis.findOne(
              { 
                  where: { id: Number(id) }
              })
          return res.status(200).json(umNivel)
      } catch (error){
          return res.status(500).json(error.message)
      }
  }

  static async criaNivel (req, res) {
      const novoNivel = req.body
      try {
          const novoNivelCriado = await database.Niveis.create(novoNivel)
          return res.status(200).json(novoNivelCriado)
      } catch (error){
          return res.status(500).json(error.message)
      }
  }

  static async atualizaNivel (req, res) {
      const novasInfosNivel = req.body
      const { id } = req.params
      try {
          await database.Niveis.update(
              novasInfosNivel,
              {
                  where: {
                      id: Number(id)
                  }
              }
          )
          const nivelAtualizado = await database.Niveis.findOne (
              {
                  where: {id : Number(id)}
              }
          )
          return res.status(200).json(nivelAtualizado)
      } catch (error){
          return res.status(500).json(error.message)
      }
  }

  static async deletaNivel (req, res){
      const { id } = req.params
      try {
          await database.Niveis.destroy(
              {
                  where : {id: Number(id)}
              }
          )
          return res.status(200).json( {mensagem: `id ${id} deletado`})
      }catch(error){
          return res.status(500).json(error.message)
      }
  }

}

module.exports = NivelController