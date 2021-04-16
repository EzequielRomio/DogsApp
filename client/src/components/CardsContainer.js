import React from 'react';

import {DogCard} from './DogCard.js'; 

export const CardsContainer = () => {
    return (
        <div>
            Here dogs will be displayed
            <DogCard dog={{name: 'Waterdog', image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg'}} />
        </div>
    )
}