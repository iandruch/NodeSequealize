const database = require ('../models')
const Sequelize = require ('sequelize')

class PessoaController {
    static async listaTodasAsPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async listaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async buscaPessoaPorId (req, res){
        const { id } = req.params
        try{
            const umaPessoa = await database.Pessoas.findOne(
                { 
                    where: { id: Number(id) }
                })
            return res.status(200).json(umaPessoa)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa (req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa (req, res) {
        const novasInfosPessoa = req.body
        const { id } = req.params
        try {
            await database.Pessoas.update(
                novasInfosPessoa,
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            const pessoaAtualizada = await database.Pessoas.findOne (
                {
                    where: {id : Number(id)}
                }
            )
            return res.status(200).json(pessoaAtualizada)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async deletaPessoa (req, res){
        const { id } = req.params
        try {
            await database.Pessoas.destroy(
                {
                    where : {id: Number(id)}
                }
            )
            return res.status(200).json( {mensagem: `id ${id} deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa (req, res){
        const { id } = req.params
        try {
            await database.Pessoas.restore(
                {
                    where : {id: Number(id)}
                }
            )
            return res.status(200).json( {mensagem: `id ${id} restaurado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async buscaMatriculaPorId (req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            const umaMatricula = await database.Matriculas.findOne(
                { 
                    where: { 
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId) 
                    }
                })
            return res.status(200).json(umaMatricula)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula (req, res) {
        const { estudanteId } = req.params        
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async listaMatriculasPorEstudante (req, res){
        const { idEstudante } = req.params
        try {
            const pessoa = await database.Pessoas.findOne( { where : {id: Number(idEstudante)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            //database.Matriculas.findAll(
            //    {
            //        where : {estundante_id: Number(idEstudante)}
            //    }
            //)
            return res.status(200).json( {matriculas} )
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    
    static async listaMatriculasPorTurma (req, res){
        const { idTurma } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        turma_id: Number(idTurma),
                        status: 'confirmado'
                    },
                    limite: 20,
                    order: [['estudante_id', 'ASC']]
                })
            return res.status(200).json( todasAsMatriculas )
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async listaTurmasLotadas (req, res){
        const lotacaoPorTurma = 2
        try {
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoPorTurma}`)
                })
            return res.status(200).json( turmasLotadas.count )
        }catch(error){
            return res.status(500).json(error.message)
        }
    }



}


module.exports = PessoaController