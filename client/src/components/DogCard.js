import axios from 'axios';
import React from 'react';

import {Image} from './Image';
import dog_not_found from '../images/dog_not_found.jpg'

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
 
const DogCard = (props) => {
    console.log(props);
    //const {dog, fullData} = props
    // if (!dog) {
    //     axios.get(`http://localhost:3001/dogs?name=${match.params.breed}`, {responseType: 'json'})
    //         .then(res => {
    //             if (res.status === 200) {
    //                 const dog = res.data
    //                 return {...dog, weight: dog.weight.metric, height: dog.height.metric}
    //             } else {
    //                 return res.status
    //             }
    //         })
    //         .then(dog => {
    //             if (typeof dog === 'number') {
    //                 return dogNotFound(match.params.breed)
    //             } else {
    //                 return displayDog(dog, fullData=true)
    //             }
    //         })
    // } else {
    //     return displayDog(dog, fullData=false)
    // }
    return (
        <div>
            hola!
        </div>
    )
}

export default DogCard;