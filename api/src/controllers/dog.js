const axios = require('axios');
const {v4: uuidv4} = require('uuid');

const {Dog, Temperament} = require('../db.js');

function setTemperamentData(temp) {
    return {
        name: temp.name,
        id: temp.id
    }
}

function setDogData(dog) {
    // gets shure dog.temperaments exist, else replace with temperament string
    const temperament = dog.temperaments ? dog.temperaments.map(temp => setTemperamentData(temp)) : dog.temperament;
    return {
        name: dog.name,
        weight: dog.weight,
        height: dog.height,
        id: dog.id,
        image: dog.image,
        temperaments: temperament,
        life_span: dog.life_span,
        created_by_user: dog.created_by_user || false
    };
}

function getDogs(req, res, next) {
    const name = req.query.name
    if (!name) {
        const dogsApi = axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'});
        const dogsDB = Dog.findAll({include: [Temperament]});
        Promise.all([dogsApi, dogsDB])
            .then(dogs => {
                let [dogsApiResult, dogsDBResult] = dogs;
                let data = dogsDBResult.concat(dogsApiResult.data);
                //data = data.splice(0, 8)
                data = data.map(dog => setDogData(dog));
                return res.status(200).json(data);    
            })
            .catch(err => next(err));

    } else {
        const dogsDB = Dog.findAll({where: {name: name}, include: [Temperament]})
        const dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        Promise.all([dogsApi, dogsDB])
            .then(dogs => {
                let [dogsApiResult, dogsDBResult] = dogs;
                let data = dogsDBResult.concat(dogsApiResult.data);
                if (data.length > 0) {   
                    data = data.splice(0, 8);
                    data = data.map(dog => setDogData(dog));
                    return res.status(200).json(data);
                } else {
                    next({status: 404, message: 'Name not found'}); 
                }   
            })
            .catch(err => next(err));        
    }

}


function getDog(req, res, next) {
    let idNum = req.params.id;
    if (idNum.includes('a') || idNum.includes('b') || idNum.includes('c') || idNum.includes('d') || idNum.includes('e')) {
        Dog.findOne({where: {id: idNum}, include: [Temperament]}).then(dog => {
            if (dog) {
                const data = setDogData(dog)
                return res.json(data)
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
                const data = setDogData(dog)
                return res.json(data)
            } else {
                next({status: 404, message: "Id not found"})
            }
        })
        .catch(err => next(err));
    }

}


async function addDog(req, res, next) {
    try{
        if (req.body.name && req.body.height && req.body.weight && req.body.temperament) {
            const id = uuidv4();
            const newDog = {...req.body, id, created_by_user: true}
            const postedDog = await Dog.create(newDog);
            const temperaments = newDog.temperament.replace(/,/g, '').split(' ');
            for (const temperament of temperaments) {
                try {
                    const postedTemperament = await Temperament.findOrCreate({where: {name: temperament}})  
                    await postedDog.addTemperament(postedTemperament[0].dataValues.id);
                } catch (err) {
                    console.log(err)
                }
            }
            return res.status(200).json(postedDog)
        } else {
            next({status: 400, message: 'Important fields missing'})
        }
    } catch {
        next({status: 409, message: `This dog already exist`})
    }
}


module.exports = {
    getDogs,
    getDog,
    addDog,
}