const { Router } = require('express');
const axios = require('axios');

const temperament = require('./temperaments.js');
const dog = require('./dogs.js')
const {Dog, Temperament} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/temperament', temperament);
router.use('/dogs', dog);
router.use('/dog', dog);

const fillDataBase = () => {
    // import axios from axios, Dog from db.js
    axios.get('https://api.thedogapi.com/v1/breeds', {responseType: 'json'})
        .then(r =>{
            r.data.forEach(newDog => {
                Dog.create({
                    name: newDog.name,
                    height: newDog.height,
                    weight: newDog.weight,
                    life_span: newDog.life_span,
                    external_api_id: newDog.id        
                });
            });
        })
        .catch(err => {
            console.log(err);
        });   

}
fillDataBase()

module.exports = router;
