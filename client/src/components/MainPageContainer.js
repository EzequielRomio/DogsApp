import React from 'react';

import {Image} from './Image.js';
import {Title} from './Title.js';
import {MainPageButton} from './MainPageButton.js';
import dog_img from '../images/main_page_dog.jfif';

export const MainPageContainer = () => {
    return (
    <div>
        <Title isMain={'title'}/>
        <Image imgToDisplay={dog_img} altDescription={'White and black dog'}/>
        <MainPageButton />
    </div>
    )
}