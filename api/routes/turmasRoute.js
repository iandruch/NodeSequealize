//routes/turmasRoute.js

const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()
router
 .get('/turmas', TurmaController.listaTodasAsTurmas)
 .get('/turmas/:id', TurmaController.buscaTurmaPorId)
 .post('/turmas', TurmaController.criaTurma)
 .put('/turmas/:id', TurmaController.atualizaTurma)
 .delete('/turmas/:id', TurmaController.deletaTurma)
module.exports = router