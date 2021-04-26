import React from 'react';

export const Title = ({isMain}) => {
    return (
        <div className={`${isMain || 'subtitle'}`}  data-testid="1">
            Dogs&#128054;pp! 
        </div>
    )
}