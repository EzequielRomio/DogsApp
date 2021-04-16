import React from 'react';
import {Link} from 'react-router-dom';

export const NavLink = ({target, description}) => {
    return (
        <li>
            <Link to={`${target}`}>
                <span>{description}</span>
            </Link>
        </li>
    )
}