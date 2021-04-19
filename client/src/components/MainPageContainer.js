import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Image} from './Image.js';
import {Title} from './Title.js';
import dog_img from '../images/main_page_dog.jfif';
import {getDogs, getTemperaments} from '../actions/index.js';

const MainPageContainer = ({getDogs, getTemperaments}) => {
    const handleClick = (e) => {
        e.preventDefault();
        getDogs();
        getTemperaments();
    }
    return (
    <div>
        <Title isMain={'title'}/>
        <Image imgToDisplay={dog_img} altDescription={'White and black dog'} imgWidth={"300"} imgHeight={"300"} />
        <Link to={'/dogs'}>
            <button onClick={(e) => handleClick(e)}>START</button>
        </Link>
    </div>
    )
}

export default connect(null, {getDogs, getTemperaments})(MainPageContainer)