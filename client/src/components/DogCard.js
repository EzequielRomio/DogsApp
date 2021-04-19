import React from 'react';

import {Image} from './Image';

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

export const DogCard = ({dog, fullData}) => {
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