const router = require('express').Router()

const {getTemperaments, addTemperament, getTemperamentByName} = require('../controllers/temperament.js')

router.get('/', getTemperaments);
router.get('/:name', getTemperamentByName);
router.post('/', addTemperament);


module.exports = router;