import React from 'react';

import Filters from './Filters.js';
import '../styles/FiltersContainer.css';

export const FiltersContainer = () => {
    return (
        <div className={'filter-container'}>
            <Filters filterLabel={"Breed"} />
            <Filters filterLabel={"Temperament"} />
        </div>
    )
}