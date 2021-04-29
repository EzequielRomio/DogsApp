import React from 'react';

import {Title} from './Title.js';
import {Image} from './Image.js';

export const ServerError = () => {
    return (
        <div>
            <Title isMain={'title'}></Title>
            <h2>We 're having problems with server connection</h2>
            <Image imgToDisplay={'https://thumbs.gfycat.com/DearestSerpentineEnglishsetter.webp'}></Image>
            <h4>Try later!</h4>
        </div>
    )
}
