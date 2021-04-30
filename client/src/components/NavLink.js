import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/NavLink.css';

export const NavLink = ({target, description}) => {
    return (
        <div>
            <Link to={`${target}`}>
                <span>{description}</span>
            </Link>
        </div>
    )
}