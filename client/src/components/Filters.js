import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

//import {getBreeds} from '../actions/index.js';


const Filters = ({filterLabel, temperaments, breeds}) => {
    let filterType = null;
    filterLabel === 'Breed' ? filterType = breeds : filterType = temperaments.map(t => {
        if (typeof t === 'string') {return t}
        else {return t.name}
        })
    const [filter, setFilter] = useState(filterType)

    const displayOptions = (filter) => {
        return filter.map((label, ix)=> {
            return (
                <option key={ix}>{label}</option>
            )
        })
    }

    return (
        <div>
            <label>Filter by {filterLabel}</label>
            <select>
                {filterLabel === 'Breed' && displayOptions(breeds)}
                {Array.isArray(filter) && filter.length > 1 && displayOptions(filter)}
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

export default connect(mapStateToProps)(Filters)