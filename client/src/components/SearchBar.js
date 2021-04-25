import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {searchName} from '../actions/index.js';

const SearchBar = ({searchName}) => {
    const [input, setInput] = useState('');

    const onChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    useEffect(() => {
        console.log(input);
        searchName(input)
    }, [input])

    return (
        <div >
            
            <input 
                type="text"
                value={input}
                onChange={onChange}
                placeholder=" Search Dog/Breed"

                className={'search-input'}
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