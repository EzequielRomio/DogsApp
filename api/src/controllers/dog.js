const axios = require('axios');
const {v4: uuidv4} = require('uuid');

const {Dog} = require('../db.js');

function getDogs(req, res, next) {
    console.log(req.body)
    const dogsApi = axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'});
    const dogsDB = Dog.findAll();
    Promise.all([dogsApi, dogsDB])
        .then(dogs => {
            let [dogsApiResult, dogsDBResult] = dogs;
            return res.status(200).json(dogsDBResult.concat(dogsApiResult.data))
        })
        .catch(err => next(err));
}

function getDog(req, res, next) {
    let idNum = req.params.id;
    if (idNum.includes('-') && !parseInt(idNum)) {
        Dog.findOne({where: {id: idNum}}).then(dog => {
            if (dog) {
                return res.json(dog)
            } else {
                next({status: 404, message: "Id not found"});
            }
        }).catch(err => next(err))
    } else {
        idNum = parseInt(idNum);
        if (idNum < 1) {
            next({status: 400, message: "Id must be greater than 0"})
        } 
        
        axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'})
        .then(apiRes => {
            const dog = apiRes.data.find(apiDog => apiDog["id"] === idNum);
            if (dog) {
                return res.json(dog)
            } else {
                next({status: 404, message: "Id not found"})
            }
        })
        .catch(err => next(err));
    }

}

function addDog(req, res, next) {
    const id = uuidv4();
    const newDog = {...req.body, id}
    return Dog.create(newDog       
    )
        .then(result => res.status(200).json({result}))
        .catch(err => next(err));
}

module.exports = {
    getDogs,
    getDog,
    addDog
}