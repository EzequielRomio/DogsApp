import axios from 'axios';
import React, {useState} from 'react';

import {Image} from './Image';
import dog_not_found from '../images/dog_not_found.jpg'
import defaultImg from '../images/default.png'

const setDetails = (dog) => {
    return (
        <div>
            <h5>Height: </h5>
            <p>{dog.height}</p>
            <h5>Weight: </h5>
            <p>{dog.weight}</p>
            <h5>Life Span: </h5>
            <p>{dog.life_span}</p>
        </div>
    )
}

const setTemperaments = (temps) => {
    if (!temps || !Array.isArray(temps)) {return 'Chill'};
    return (temps.map(t => t.name)).join(' ')
}


const displayDog = (dog, fullData) => {
    return (
        <div style={{border: "2px solid", borderColor: "black"}}>
            <div>
                <h5>Name: </h5>
                <p>{dog.name}</p>
                <h5>Temperaments: </h5>
                <p>{dog.temperaments}</p>
            </div>
            {fullData && setDetails(dog)}
            <Image imgToDisplay={dog.image} altDescription={'Dog´s breed'} />
        </div>
    )

}

const dogNotFound = () => {
    return (
        <div>
            <h1>Dog not found!</h1>
            <Image imgToDisplay={dog_not_found} imgWidth="651" imgHeight="406"/>
        </div>
    )
}
 
const DogCard = ({dog, match}) => {
    const [dogsFound, setDogsFound] = useState([])
    const [error, setError] = useState(false);

    if (!dog && dogsFound.length === 0 && !error) {
        axios.get(`http://localhost:3001/dogs?name=${match.params.breed}`, {responseType: 'json'})
            .then(res => {
                if (res.status === 200) {
                    const dogs = res.data.map(dog => {
                        return {...dog,
                            weight: dog.weight.metric,
                            height: dog.height.metric,
                            image: (dog.image && dog.image.url) || defaultImg,
                            temperaments: setTemperaments(dog.temperaments)
                        }
                    })
                    console.log(dogs)
                    return dogs
                }
            })
            .then(dogs => {
                setDogsFound(dogs)
            })
            .catch(err => {
                console.log(err)
                setError(true);
            })
    }
    return (
        <div>
            {
                (dog && displayDog(dog, false)) ||
                (dogsFound.length > 0 && dogsFound.map(dog => displayDog(dog, true))) ||
                (error && dogNotFound()) ||
                'Loading...'
            }
        </div>
    )
}

export default DogCard;