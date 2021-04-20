import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {Image} from './Image.js';
import magnifying_glass from '../images/magnifying_glass.png';
import {searchName} from '../actions/index.js';
// eliminar borde del input y usar borde del div ya q el input no puede tener hijos 

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
        <div>
            <input 
                type="text"
                value={input}
                onChange={onChange}
                placeholder="Search Dog/Breed"
            ></input>
            <Image imgToDisplay={magnifying_glass} altDescription={"Search"} imgWidth={"20"} imgHeight={"19"}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchName: txt => dispatch(searchName(txt))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar)