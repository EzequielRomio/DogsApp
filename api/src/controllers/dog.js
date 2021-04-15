const axios = require('axios');
const {v4: uuidv4} = require('uuid');

const {Dog} = require('../db.js');

function getDogs(req, res, next) {
    const name = req.query.name
    console.log(name)
    if (!name) {
        const dogsApi = axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'});
        const dogsDB = Dog.findAll();
        Promise.all([dogsApi, dogsDB])
            .then(dogs => {
                let [dogsApiResult, dogsDBResult] = dogs;
                const data = dogsDBResult.concat(dogsApiResult.data);
                return res.status(200).json(data);    
            })
            .catch(err => next(err));

    } else {
        const dogsDB = Dog.findAll({where: {name: name}})
        const dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        Promise.all([dogsApi, dogsDB])
            .then(dogs => {
                let [dogsApiResult, dogsDBResult] = dogs;
                const data = dogsDBResult.concat(dogsApiResult.data);   
                const first8 = data.splice(0, 8);
                return res.status(200).json(first8);    
            })
            .catch(err => next(err));        
    }

}


const promisedSearch = function(name, list) {
    return new Promise(function(resolve, reject) {
        searchName(name, list, function(err, data) {
            if (err) {return reject(Error('Error ocurred'))};
            resolve(data);
        });
    });
};

function searchName(name, dogs) {
    const result = dogs.filter(dog => {
        dog.name === name;
    });
    while (result.length > 8) {
        result.pop()
    };
    console.log(result)
    return result;
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
    // FALTAR VALIDAR BODY
    const id = uuidv4();
    const newDog = {...req.body, id}
    return Dog.create(newDog)
        .then(result => res.status(200).json({result}))
        .catch(err => next(err));
}

module.exports = {
    getDogs,
    getDog,
    addDog,
}