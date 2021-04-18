import React from 'react';
import {Link} from 'react-router-dom';

export const NavLink = ({target, description}) => {
    return (
        <div>
            <Link to={`${target}`}>
                <span>{description}</span>
            </Link>
        </div>
    )
}