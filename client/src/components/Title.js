import React from 'react';

import '../styles/Title.css';

export const Title = ({isMain}) => {
    return (
        <div className={`${isMain || 'subtitle'}`}  data-testid="1">
            Dogs&#128054;pp! 
        </div>
    )
}