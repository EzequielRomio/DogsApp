import React, {useCallback} from 'react';
import {connect} from 'react-redux';

import {searchName} from '../actions/index.js';
import '../styles/SearchBar.css';

const SearchBar = ({searchName}) => {

    const onChange = (e) => {
        e.preventDefault();
        search(e)
    }

    const search = useCallback(e => {
        searchName(e.target.value)
    }, [searchName])

    return (
        <div >
            
            <input 
                type="text"
                onChange={onChange}
                placeholder=" Search Dog/Breed"
                className={'inputs'}
            ></input>
            <span >&#x1F50D;</span> 
            
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchName: txt => dispatch(searchName(txt))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar)