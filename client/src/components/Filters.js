import React from 'react';
import {connect} from 'react-redux';

import {filterBreeds, filterTemperaments, getTemperaments} from '../actions/index.js';
import '../styles/Filters.css';


const Filters = ({filterLabel, temperaments, filterBreeds, filterTemperaments, getTemperaments}) => {
    
    filterLabel === 'Temperament' && temperaments.length === 0 && getTemperaments()

    let temperamentsNames = null;
    if (filterLabel === 'Temperament') {
        temperamentsNames = temperaments.map(t => {
            if (typeof t === 'string') {return t}
            else {return t.name}
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (filterLabel === 'Breeds') {filterBreeds(e.target.value)};
        if (filterLabel === 'Temperament') {filterTemperaments(e.target.value)};
        
    }

    const displayOptions = (filter) => {
        return filter.map((label, ix)=> {
            return (
                <option name={label} onChange={(e) => handleClick(e)} key={ix}>{label}</option>
            )
        })
    }
    
    return (
        <div className={'filter'}>
            <h5> <label>Filter by {filterLabel}</label> </h5>
            <select onChange={(e) => handleClick(e)}>
                <option name={'initial'} key={'initial'}>-</option>
                {(filterLabel === 'Breeds' && displayOptions(['Created by our Users', 'Recognized'])) || (temperamentsNames && displayOptions(temperamentsNames))}
            </select>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        temperaments: state.temperaments,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterBreeds: breedType => dispatch(filterBreeds(breedType)),
        filterTemperaments: tempName => dispatch(filterTemperaments(tempName)),
        getTemperaments: () => dispatch(getTemperaments())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)