import React from 'react';
import {Link} from 'react-router-dom';

export const MainPageButton = () => {
    return (
        <div>
            <Link to={'/dogs'}>
                <button>
                    START
                </button>
            </Link>
        </div>
    )
}