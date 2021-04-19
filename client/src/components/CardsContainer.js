import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {DogCard} from './DogCard.js'; 
import {getDogs} from '../actions/index.js';

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

const CardsContainer = ({dogs}) => {
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     alert('hola');
    //     return setDogsToDisplay(dogs)
    // }
    
    return (
        <div style={{display: "flex", alignContent: "space-between", flexDirection: "column"}}>
            Here dogs will be displayed
            {dogs.map(dog => {
                return (
                    <div key={dog.id} style={{margin: "20px 350px 20px 350px"}}>
                        <Link to={`/dogs/details/${dog.name}`} >
                            <DogCard dog={{name: dog.name, image: dog.image.url, temperaments: setTemperaments(dog.temperaments)}} />
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
        dogs: state.dogs
    }
}

export default connect(mapStateToProps)(CardsContainer);