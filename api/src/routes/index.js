const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', function(req, res){
    return res.status(200).json({"dog": "water"})
})

router.get('/dogs', function(req, res){
    return res.status(200).json({"dog": "water"})
})

module.exports = router;
