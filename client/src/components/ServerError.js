import React from 'react';

import {Title} from './Title.js';
import {Image} from './Image.js';
import '../styles/ServerError.css';

export const ServerError = () => {
    console.log(
        'If you are reading this message it´s cause server is not working, or server is not sending data to display'
    )

    return (
        <div className={'server-error-container'}>
            <Title isMain={'title'}></Title>
            <h2>We 're having problems with server connection</h2>
            <div className={'circle'}>
                <Image imgToDisplay={'https://thumbs.gfycat.com/DearestSerpentineEnglishsetter.webp'}></Image>
            </div>
            <h4>Try again later!</h4>
        </div>
    )
}
