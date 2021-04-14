const { Router } = require('express');

const temperamentRoutes = require('./temperament.js');
const dogRoutes = require('./dog.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/temperament', temperamentRoutes);
router.use('/dogs', dogRoutes);
router.use('/dog', dogRoutes);

module.exports = router;
