import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {sortByBreeds, sortByWeights} from '../actions/index.js'

const SortBar = ({sortBreeds, sortWeights}) => {
    const [breedSwitch, setBreedSwitch] = useState(true);
    const [weightSwitch, setWeightSwitch] = useState(true);

    const toggle = (property) => {
        //property === 'breed' ? setBreedFlag(!breedFlag) : setWeightFlag(!weightFlag);
        if (property === 'breed') {
            setBreedSwitch(!breedSwitch);
            sortBreeds(breedSwitch);
        } else {
            setWeightSwitch(!weightSwitch);
            sortWeights(weightSwitch);
        }

    }

    const handleClick = (e) => {
        e.preventDefault();
        toggle(e.target.name)
    }

    return (
        <div>
            SORT BY:
            <button name="breed" onClick={(e) => handleClick(e)}>Breeds</button>
            <button name="weight" onClick={(e) => handleClick(e)}>Weight</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortBreeds: order => dispatch(sortByBreeds(order)),
        sortWeights: order => dispatch(sortByWeights(order))
    }
}

export default connect(null, mapDispatchToProps)(SortBar);