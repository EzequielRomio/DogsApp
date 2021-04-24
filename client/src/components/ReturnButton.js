import React from 'react';
import {Link} from 'react-router-dom';


export const ReturnButton = () => {
    return (
        <div>
            <Link to={'/dogs'}>
                <span> 
                    <div > &#8592; </div>
                    Return Home
                </span>
            </Link>
        </div>
    )
}