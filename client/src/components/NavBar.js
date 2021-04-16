import React from 'react';

import {NavLink} from './NavLink.js';

export const NavBar = () => {
    return (
        <ul>
            <NavLink target={'/dogs'} description={'DOGS'}/>
            <NavLink target={'/dogs/temperaments'} description={'TEMPERAMENTS'}/>
            <NavLink target={'/dogs/create'} description={'CREATE NEW DOG'}/>
        </ul>
    )
}