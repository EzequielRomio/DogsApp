import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import DogCard from './DogCard.js'; 
import defaultImg from '../images/default.png'
import { filterBreeds, getDogs } from '../actions/index.js';

const setTemperaments = (temps) => {
    if (!temps || !Array.isArray(temps)) {return 'Chill'};
    return (temps.map(t => t.name)).join(' ')
}


const getPaginate = (dogsToDisplay, handlePaginate) => {
    let totalPages = Math.floor(dogsToDisplay.length / 8) // corregir el resto %
    if (dogsToDisplay.length % 8 > 0) totalPages++;
    
    const paginateButtons = []; 
    for (let i=1; i < totalPages; i++) {
        paginateButtons.push(i) 
    }
    return (
        <div>
            {paginateButtons.map(page => {
                return (
                    <button key={page} onClick={(e) => handlePaginate(e)} value={page}>{page}</button>
                ) 
            })}
        </div>
    )
}


const CardsContainer = ({dogs, filtered, getDogs, match}) => {
    (dogs.length === 0 || dogs.length === 1) && getDogs();

    let dogsToDisplay = null;
    filtered.length > 0 ? dogsToDisplay = filtered : dogsToDisplay = dogs;

    const [index, setIndex] = useState(0);

    const handlePaginate = (e) => {
        e.preventDefault();
        const targetIndex = (e.target.value - 1) * 8
        setIndex(targetIndex)
    }
    
    return (
        <div style={{display: "flex", alignContent: "space-between", flexDirection: "column"}}>
            {[...dogsToDisplay].splice(index, 8).map(dog => {
                return (
                    <div key={dog.id} style={{margin: "20px 350px 20px 350px"}}>
                        <Link to={`/dogs/details/${dog.id}`} >
                            <DogCard match={match} dog={{
                                name: dog.name, 
                                image: (dog.image && dog.image.url) || defaultImg,
                                temperaments: setTemperaments(dog.temperaments)
                                }} />
                        </Link>
                    </div>
                )
            })}
            
            {getPaginate(dogsToDisplay, handlePaginate)}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        dogs: state.dogs,
        filtered: state.filtered
    }
}


export default connect(mapStateToProps, {getDogs})(CardsContainer);