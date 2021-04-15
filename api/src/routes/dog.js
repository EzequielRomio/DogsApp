const router = require('express').Router();

const {Dog} = require('../db.js');
const {getDogs, getDog, addDog} = require('../controllers/dog.js');


router.get('/', getDogs);
router.get('/:id', getDog);
router.post('/', addDog);

module.exports = router;