import React from 'react';

import {Image} from './Image';

export const DogCard = ({dog}) => {
    return (
        <div style={{border: "2px solid", borderColor: "black"}}>
            <div>
                <h5>Name: </h5>
                <p>{dog.name}</p>
                <h5>Temperaments: </h5>
                <p>{'Dog.temperaments (this will be a json or array, so use a map())'}</p>
            </div>
            <Image imgToDisplay={dog.image} altDescription={'Dog´s breed'} />
        </div>
    )
}