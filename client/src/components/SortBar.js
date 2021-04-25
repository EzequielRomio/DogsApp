import React, {useState} from 'react';
import {connect} from 'react-redux';

import {sortByBreeds, sortByWeights} from '../actions/index.js'

const SortBar = ({sortBreeds, sortWeights}) => {
    const [breedSwitch, setBreedSwitch] = useState(true);
    const [weightSwitch, setWeightSwitch] = useState(true);

    const toggle = (property) => {
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
        <div className={'sort-container'}>
            <h5>SORT BY:</h5>
            <button name="breed" className={'sort'} onClick={(e) => handleClick(e)}>Breeds</button>
            <div className={'sort-separator'}></div>
            <button name="weight" className={'sort'} onClick={(e) => handleClick(e)}>Weight</button>
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