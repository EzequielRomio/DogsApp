import React from 'react';

export const Image = ({imgToDisplay, altDescription, imgWidth, imgHeight, className}) => {
    return (
        <div>
            <img src={imgToDisplay} alt={altDescription} width={imgWidth || "25%"} height={imgHeight || "25%"} className={className || 'none'}></img>
        </div>
    )
}