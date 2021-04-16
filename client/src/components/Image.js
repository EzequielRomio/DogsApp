import React from 'react';

export const Image = ({imgToDisplay, altDescription, imgWidth, imgHeight}) => {
    return (
        <div>
            <img src={imgToDisplay} alt={altDescription} width={imgWidth || "125"} height={imgHeight || "100"}></img>
        </div>
    )
}