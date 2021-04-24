const axios = require('axios');
const {v4: uuidv4} = require('uuid');

const {Temperament, Dog} = require('../db.js');

function setDogData(dog) {
    return {
        name: dog.name,
        id: dog.id
    }
}

function setTemperamentData(temp) {
    return {
        name: temp.name,
        id: temp.id,
        dogs: temp.dogs.map(dog => setDogData(dog))
    }
}

function getTemperaments(req, res, next) {
    return Temperament.findAll({include: [Dog]})
        .then(temperaments => {
            const result = temperaments.map(temp => setTemperamentData(temp));
            res.json(result)
        })

        .catch(err => next(err));
}

function getTemperamentByName(req, res, next) {
    const name = req.params.name;
    Temperament.findOne({where: {name}, include: [Dog]})
    .then(temperament => {
        if (temperament) {
            const data = setTemperamentData(temperament);
            return res.status(200).json(data)
        } else {
            next({status: 404, message: 'Temperament not found'});
        }
    })
    .catch(err => next(err))
}

function addTemperament(req, res, next) {
    const newTemperament = req.body
    return Temperament.findOrCreate({where: newTemperament})
        .then(result => res.status(200).json({result}))
        .catch(err => next(err));
}


async function fillDB () {
    try {
        const dogs = await axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'});
        for (const dog of dogs.data) {
            //"Aloof, Clownish, Dignified, Independent, Happy"
            if (dog.temperament && dog.name) {
                const temperaments = dog.temperament.replace(/,/g, '').split(' ');
                const id = uuidv4();
                const newDog = {...dog, id};
                const postedDog = await Dog.create(newDog); 
                for (const temperament of temperaments) {
                    try {
                        const postedTemp = await Temperament.findOrCreate({where: {name: temperament}});
                        await postedTemp[0].addDog(postedDog)
                        await postedDog.addTemperament(postedTemp[0].dataValues.id)
                    } catch (err) {
                        console.log(err)
                    }
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
    addTemperament,
    getTemperamentByName,
}