import React from 'react';

import {NavLink} from './NavLink.js';

export const NavBar = () => {
    return (
        <nav>
            <div className={'nav-links'} >
                <NavLink target={'/dogs'} description={'HOME'}/> |
                <NavLink target={'/dogs/create'} description={'CREATE NEW DOG'}/>  |
                <div>
                   <a href='https://github.com/EzequielRomio' target='_blank'>ABOUT US</a> 
                </div>
            </div>
        </nav>
    )
}