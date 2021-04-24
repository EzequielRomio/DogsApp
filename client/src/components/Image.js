import React from 'react';

export const Image = ({imgToDisplay, altDescription, imgWidth, imgHeight, className}) => {
    return (
        <div>
            <img src={imgToDisplay} alt={altDescription} width={imgWidth || "125"} height={imgHeight || "100"} className={className || 'none'}></img>
        </div>
    )
}