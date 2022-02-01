const { Router } = require ('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.listaTodasAsPessoasAtivas)
router.get('/pessoas/todos', PessoaController.listaTodasAsPessoas)
router.get('/pessoas/:idEstudante/matriculas', PessoaController.listaMatriculasPorEstudante)
router.get('/pessoas/:id', PessoaController.buscaPessoaPorId)
router.get('/pessoas/matriculas/:idTurma/confirmadas', PessoaController.listaMatriculasPorTurma)
router.get('/pessoas/matriculas/turmas/lotadas', PessoaController.listaTurmasLotadas)


router.post('/pessoas', PessoaController.criaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.buscaMatriculaPorId)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)


module.exports = router