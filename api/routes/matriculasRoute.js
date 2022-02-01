//routes/turmasRoute.js

const { Router } = require('express')
const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

router.get('/matriculas/:idTurma/confirmadas', MatriculaController.listaMatriculasPorTurma)

 module.exports = router