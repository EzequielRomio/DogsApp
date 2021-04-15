const router = require('express').Router()

const {getTemperaments, addTemperament} = require('../controllers/temperament.js')

router.get('/', getTemperaments);
router.post('/', addTemperament);


module.exports = router;