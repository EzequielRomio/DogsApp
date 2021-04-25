import React from 'react';

export const Image = ({imgToDisplay, altDescription, imgWidth, imgHeight, className}) => {
    return (
        <div>
            <img src={imgToDisplay} alt={altDescription} width={imgWidth || "200"} height={imgHeight || "150"} className={className || 'none'}></img>
        </div>
    )
}