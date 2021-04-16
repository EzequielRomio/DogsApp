import React from 'react';

export const Title = ({isMain}) => {
    return (
        <div className={`${isMain || 'subtitle'}`}>
            DogsApp!
        </div>
    )
}