import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import DogCard from './DogCard.js';
import {Image} from './Image.js'; 
import defaultImg from '../images/default.png'
import loading_gif from '../images/loading_gif.gif'
import {getDogs } from '../actions/index.js';
import '../styles/CardsContainer.css'

const setTemperaments = (temps) => {
    if (typeof temps === 'string') {
        return temps
    }

    if (!temps || !Array.isArray(temps)) {
        return 'Chill'
    };
    
    return (temps.map(t => t.name)).join(' ')
}

const loading = (loading_gif) => {
    return (
        <div >
            <Image className={'loading'} imgToDisplay={loading_gif} altDescription={'loading...'} imgWidth='400' imgHeight='300'/>
            <div className={'fill-screen'}></div>
        </div>
    )
} 

const displayNotMatches = () => {
    return (
        <div>
            <h2>No matches... &#128529;</h2>
        </div>
    )
}

const getPaginate = (dogsToDisplay, handlePaginate) => {
    let totalPages = Math.floor(dogsToDisplay.length / 8)
    if (dogsToDisplay.length % 8 > 0) totalPages++;
    
    const paginateButtons = []; 
    for (let i=1; i < totalPages; i++) {
        paginateButtons.push(i) 
    }
    return (
        <div className={'paginate-button-container'}>
            
            {paginateButtons.map(page => {
                return (
                    <button className={'paginate-button'} key={page} onClick={(e) => handlePaginate(e)} value={page}>{page}</button>
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

    useEffect(() => {
        if (dogsToDisplay.length > 0 && dogsToDisplay.length < 8) {setIndex(0)}
    }, [dogsToDisplay.length])

    const handlePaginate = (e) => {
        e.preventDefault();
        const targetIndex = (e.target.value - 1) * 8
        setIndex(targetIndex)
        window.scrollTo(0, 0)
    }

    return (
        <div className={'cards-container'}>
            {(dogsToDisplay[0] === 'NOT_MATCH' && displayNotMatches()) ||

            (dogsToDisplay.length > 0 && [...dogsToDisplay].splice(index, 8).map(dog => {
                return (
                    <div key={dog.id} onClick={() => {window.scrollTo(0 ,0)}}>
                        <Link to={`/dogs/details/${dog.id}`} >
                            <DogCard match={match} dog={{
                                name: dog.name, 
                                image: (dog.image && dog.image.url) || defaultImg,
                                temperaments: setTemperaments(dog.temperaments)
                                }} />
                        </Link>
                    </div>
                )
            })) || loading(loading_gif)}
            
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