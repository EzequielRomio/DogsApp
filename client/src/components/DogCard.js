import axios from 'axios';
import React, {useState} from 'react';

import {Image} from './Image';
import dog_not_found from '../images/dog_not_found.jpg'
import defaultImg from '../images/default.png'
import loading_gif from '../images/loading_gif.gif'

const loading = (loading_gif) => {
    return (
        <div className={'details-page-container'}>
            
            <Image className={'loading'} imgToDisplay={loading_gif} altDescription={'loading...'} imgWidth='400' imgHeight='300'/>
            
        </div>
    )
} 


const setDetails = (dog) => {
    return (
        <div className={'details-page-info details'}>
            <h5>Height: </h5>
            <p>{dog.height} cm</p>
            <h5>Weight: </h5>
            <p>{dog.weight} kg</p>
            <h5>Life Span: </h5>
            <p>{dog.life_span || '-'}</p>
        </div>
    )
}

const setTemperaments = (temps) => {
    if (!temps || !Array.isArray(temps)) {return 'Chill'};
    return (temps.map(t => t.name)).join(' ')
}


const displayDog = (dog, fullData) => {
    return (
        <div  className={(fullData && 'details-page') || 'dog-card'}>
            <Image 
                imgToDisplay={dog.image}
                imgHeight={fullData && '100%'} 
                imgWidth={fullData && '100%'}
                altDescription={'Dog´s breed'} 
                className={(fullData && 'details-dog-image') || 'dog-card-image'} 
            />
            <div >
                <div className={(fullData && 'details-page-info') || 'dog-card-content'}>
                    <h5>Name: </h5>
                    <p>{dog.name}</p>
                    <h5>Temperaments: </h5>
                    <p>{dog.temperaments}</p>
                </div>
                {fullData && setDetails(dog)}
            </div>
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
    const [dogFound, setDogFound] = useState({})
    const [error, setError] = useState(false);

    if (!dog && Object.keys(dogFound).length === 0 && !error) {
        axios.get(`http://localhost:3001/dogs/${match.params.id}`, {responseType: 'json'})
            .then(res => {
                const dog = res.data
                return {...dog,
                    weight: dog.weight.metric,
                    height: dog.height.metric,
                    image: (dog.image && dog.image.url) || defaultImg,
                    temperaments: setTemperaments(dog.temperaments)
                }
            })
            .then(dog => {
                setDogFound(dog)
            })
            .catch(err => {
                console.log(err.response.data)
                setError(true);
            })
    }
    return (
        <div className={(match.path === '/dogs/details/:id' && 'details-page-container') || 'none'}>
            {
                (dog && displayDog(dog, false)) ||
                (Object.keys(dogFound).length > 0 && displayDog(dogFound, true)) ||
                (error && dogNotFound()) ||
                loading(loading_gif)                
            }
        </div>
    )
}

export default DogCard;