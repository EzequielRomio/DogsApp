import React from 'react';

export const Title = ({isMain}) => {
    return (
        <div className={`${isMain || 'subtitle'}`}>
            Dogs&#128054;pp!
        </div>
    )
}