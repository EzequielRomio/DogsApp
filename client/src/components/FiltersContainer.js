import React from 'react';

import Filters from './Filters.js';

export const FiltersContainer = () => {
    return (
        <div>
            <Filters filterLabel={"Breed"} />
            <Filters filterLabel={"Temperament"} />
        </div>
    )
}