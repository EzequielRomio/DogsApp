import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {filterBreeds} from '../actions/index.js';

const sortTemperaments = (array) => {
    const mapped = array.map((element, ix) => {
        let value = element.toLowerCase();
        return {ix, value}
    })

    mapped.sort((a, b) => (a.value).localeCompare(b.value));
    return mapped.map((element) => {return array[element.ix]})
}



const Filters = ({filterLabel, temperaments, breeds, filterBreeds}) => {
    let temperamentsNames = null;
    if (filterLabel === 'Temperament') {
        temperamentsNames = temperaments.map(t => {
            if (typeof t === 'string') {return t}
            else {return t.name}
        })
        temperamentsNames = sortTemperaments(temperamentsNames)
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        filterBreeds(e.target.value)
    }

    const displayOptions = (filter) => {
        return filter.map((label, ix)=> {
            return (
                <option name={label} onChange={(e) => handleClick(e)} key={ix}>{label}</option>
            )
        })
    }
    
    return (
        <div>
            <label>Filter by {filterLabel}</label>
            <select onChange={(e) => handleClick(e)}>
                <option name={'initial'} key={'initial'}>-</option>
                {(breeds && (filterLabel === 'Breed' && displayOptions(breeds))) || (temperamentsNames && displayOptions(temperamentsNames))}
            </select>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        temperaments: state.temperaments,
        breeds: state.breeds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterBreeds: breedName => dispatch(filterBreeds(breedName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)