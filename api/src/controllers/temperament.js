const axios = require('axios');

const {Temperament, Dog} = require('../db.js');

function getTemperaments(req, res, next) {
    return Temperament.findAll()
        .then(temperaments => res.json({temperaments}))
        .catch(err => next(err));
}

function addTemperament(req, res, next) {
    const newTemperament = req.body
    return Temperament.findOrCreate({where: newTemperament})
        .then(result => res.status(200).json({result}))
        .catch(err => next(err));
}

function fillDB() {
    axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'})
    .then(res => {
        const dogs = res.data;
        for (const d of dogs) {
            //"Aloof, Clownish, Dignified, Independent, Happy"
            if (d.temperament) {
                const temperaments = d.temperament.split(' ');
                for (let tempe of temperaments) {
                    tempe = tempe.replace(',', '');
                    Temperament.findOrCreate({where: {name: tempe}});
                }
            }
        }
    })
    .catch(err => console.error(err))
}

fillDB() //Initialize DB 

module.exports = {
    getTemperaments,
    addTemperament
}