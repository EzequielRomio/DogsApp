import React from 'react';
import {Link} from 'react-router-dom';


export const ReturnButton = () => {
    return (
        <div className={'return-button'}>
            <Link to={'/dogs'}>
                <span> 
                    <div onClick={() => {window.scrollTo(0 ,0)}}> &#8592; </div>
                    Return Home
                </span>
            </Link>
        </div>
    )
}