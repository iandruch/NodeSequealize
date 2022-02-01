const { MatriculasServices } = require ('../services')
const matriculasServices = new MatriculasServices()

class MatriculaController {
    
    static async listaMatriculasPorTurma (req, res){
        const { idTurma } = req.params
        try {
            const todasAsMatriculas = await matriculasServices
                .encontraEContaRegistros(
                    {
                        turma_id: Number(idTurma),
                        status: 'confirmado'
                    },
                    {
                        limite: 20,
                        order: [['estudante_id', 'ASC']]
                    }
                )
            return res.status(200).json( todasAsMatriculas )
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = MatriculaController
