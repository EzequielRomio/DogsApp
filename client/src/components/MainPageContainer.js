import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Image} from './Image.js';
import {Title} from './Title.js';
import dog_img from '../images/main_page_dog.jfif';
import {getDogs} from '../actions/index.js';

const MainPageContainer = ({getDogs}) => {
    return (
    <div>
        <Title isMain={'title'}/>
        <Image imgToDisplay={dog_img} altDescription={'White and black dog'} imgWidth={"300"} imgHeight={"300"} />
        <Link to={'/dogs'}>
            <button onClick={getDogs}>START</button>
        </Link>
    </div>
    )
}

export default connect(null, {getDogs})(MainPageContainer)