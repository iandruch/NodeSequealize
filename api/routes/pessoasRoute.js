const { Router } = require ('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.listaTodasAsPessoas)

router.get('/pessoas/:id', PessoaController.buscaPessoaPorId)

router.post('/pessoas', PessoaController.criaPessoa)

router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.buscaMatriculaPorId)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)


module.exports = router