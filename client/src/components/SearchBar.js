import React from 'react';

import {Image} from './Image.js';
import magnifying_glass from '../images/magnifying_glass.png';

// eliminar borde del input y usar borde del div ya q el input no puede tener hijos 

export const SearchBar = () => {
    return (
        <div>
            <input placeholder="Search Dog/Breed"></input>
            <Image imgToDisplay={magnifying_glass} altDescription={"Search"} imgWidth={"20"} imgHeight={"19"}/>
        </div>
    )
}