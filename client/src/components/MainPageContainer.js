import React from 'react';
import {Link} from 'react-router-dom';

import {Image} from './Image.js';
import {Title} from './Title.js';
import dog_img from '../images/main_page_dog.jfif';

export const MainPageContainer = () => {
    return (
    <div>
        <Title isMain={'title'}/>
        <Image imgToDisplay={dog_img} altDescription={'White and black dog'} imgWidth={"300"} imgHeight={"300"} />
        <Link to={'/dogs'}>
            <button>START</button>
        </Link>
    </div>
    )
}