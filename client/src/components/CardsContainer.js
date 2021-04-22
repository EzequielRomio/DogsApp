import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import DogCard from './DogCard.js'; 
import defaultImg from '../images/default.png'
import { filterBreeds, getDogs } from '../actions/index.js';

const setTemperaments = (temps) => {
    if (!temps || !Array.isArray(temps)) {return 'Chill'};
    return (temps.map(t => t.name)).join(' ')
}

// const setDogsToDisplay = (dogs) => {
//     //const dogsToDisplay = dogs.splice(0, 8);
//     return dogsToDisplay.map((dog) => {
//         return (
//         <div key={dog.id} style={{margin: "20px 350px 20px 350px"}}>
//             <Link to={'/dogs/details'} >
//                 <DogCard dog={{name: dog.name, image: dog.image.url, temperaments: setTemperaments(dog.temperaments)}} />
//             </Link>
//         </div>
//         )
//     })
// }

const CardsContainer = ({dogs, filtered, getDogs, match}) => {
    (dogs.length === 0 || dogs.length === 1) && getDogs();

    let dogsToDisplay = null;
    filtered.length > 0 ? dogsToDisplay = filtered : dogsToDisplay = dogs;
    return (
        <div style={{display: "flex", alignContent: "space-between", flexDirection: "column"}}>
            {dogsToDisplay.map(dog => {console.log(dog)
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
            
            <button >More!</button>
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