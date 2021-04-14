const {v4: uuidv4} = require('uuid');

const {Temperament} = require('../db.js');

function getTemperaments(req, res, netx) {
    return Temperament.findAll()
        .then(temperaments => res.json({temperaments}))
        .catch(err => netx(err));
}

module.exports = {
    getTemperaments
}