import React from 'react';

export const Image = ({imgToDisplay, altDescription}) => {
    return (
        <div>
            <img src={imgToDisplay} alt={altDescription}></img>
        </div>
    )
}