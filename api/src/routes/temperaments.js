const router = require('express').Router()

const {Temperament} = require('../db.js')

router.get('/', function(req, res){
    // returns all the temperaments
    Temperament.findAll()
        .then(temperaments => {
            res.json({temperaments})
        })
        .catch(err => {
            res.status(404)
        });
})

module.exports = router;