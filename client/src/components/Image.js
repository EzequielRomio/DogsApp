import React from 'react';

import '../styles/Image.css';

export const Image = ({imgToDisplay, altDescription, imgWidth, imgHeight, className}) => {
    return (
        <div>
            <img data-testid="2" src={imgToDisplay} alt={altDescription} width={imgWidth || "200"} height={imgHeight || "150"} className={className || 'none'}></img>
        </div>
    )
}