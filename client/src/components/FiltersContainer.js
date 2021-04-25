import React from 'react';

import Filters from './Filters.js';

export const FiltersContainer = () => {
    return (
        <div className={'filter-container'}>
            <Filters filterLabel={"Breed"} />
            <Filters filterLabel={"Temperament"} />
        </div>
    )
}