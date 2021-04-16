const axios = require('axios');
const {v4: uuidv4} = require('uuid');

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

// function fillDB() {
//     axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'})
//     .then(res => {
//         const dogs = res.data;
//         for (const d of dogs) {
//             //"Aloof, Clownish, Dignified, Independent, Happy"
//             if (d.temperament) {
//                 const temperaments = d.temperament.split(' ');
//                 for (let tempe of temperaments) {
//                     tempe = tempe.replace(',', '');
//                     Temperament.findOrCreate({where: {name: tempe}});
//                 }
//             }
//         }
//     })
//     .catch(err => console.error(err))
// }

async function fillDB () {
    try {
        const dogs = await axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'});
        for (const dog of dogs.data) {
            //"Aloof, Clownish, Dignified, Independent, Happy"
            if (dog.temperament && dog.name) {
                const temperaments = dog.temperament.replace(/,/g, '').split(' ');
                for (const temperament of temperaments) {
                    try {
                        const id = uuidv4();
                        const newDog = {...dog, id} 
                        const postedTemp = await Temperament.create({name: temperament});
                        const postedDog = await Dog.create(newDog)
                        await postedTemp.addDog(postedDog)
                    } catch {}
                }
            }
        }

    } catch (err) {
        console.error(err)
    }
}

fillDB() //Initialize DB 

module.exports = {
    getTemperaments,
    addTemperament
}