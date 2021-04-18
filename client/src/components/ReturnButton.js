import React from 'react';
import {Link} from 'react-router-dom';


export const ReturnButton = () => {
    return (
        <div>
            <Link to={'/dogs'}>
                <h4> 
                    <div style={{fontSize: "32px"}}> &#8592; </div>
                    Return Home
                </h4>
            </Link>
        </div>
    )
}