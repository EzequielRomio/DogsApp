const router = require('express').Router();

const {Dog} = require('../db.js');

router.get('/', function(req, res){
    const nameToFind = req.query.name;
    if(!nameToFind) {
        Dog.findAll()
            .then(dogs => {
                res.json({dogs})
            })
            .catch(err => {
                console.log(err);
                res.status(404);
            });
    } else {
        Dog.findAndCountAll({
            where: {name: nameToFind},
            limit: 8
        })
        .then(dogs => {
            if (dogs.count === 0) {
                return res.sendStatus(404).json({"Error": "Name not found"})
            } else {
                const rows = dogs.rows
                return res.json({rows})
            }
        }).catch(err => {
            console.log(err);
            return res.sendStatus(404).json({"Error": "Name not found"})
        })
    }
});


router.get('/:id', function(req, res){
    // returns breed by id including asociated temperaments
    const idNum = req.params.id;
    Dog.findOne({
        where: {id: idNum}
    }).then(dog => {
        if(!dog) {
            return res.sendStatus(404).json({"Error": "ID not found"});
        } else {
            return res.json(dog)
        }
    }).catch(err => console.log(err))
});


router.post('/', function(req, res){
    // post a new dog
    const newDog = req.body
    Dog.create({
        name: newDog.name,
        height: newDog.height,
        weight: newDog.weight,
        life_span: newDog.life_span,
        external_api_id: newDog.id        
    })
        .then(newId => {
            return res.status(200).json({newId})
        })
        .catch(err => {
            return res.status(400).json({err})
        });
})

module.exports = router;