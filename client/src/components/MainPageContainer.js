import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Image} from './Image.js';
import {Title} from './Title.js';
import startButton from '../images/start-button.png';
import {getDogs, getTemperaments} from '../actions/index.js';
import '../styles/MainPageContainer.css';


const MainPageContainer = ({getDogs, getTemperaments}) => {

    // initialize the store...
    getDogs();
    getTemperaments();

    return (
    <div className={'main-page'} data-testid="0">
        <div className={'transparent-bg'}>
            <Title isMain={'title'} />
            <Link to={'/dogs'} className={'start-button'}>
                <Image imgToDisplay={startButton} imgHeight='180' imgWidth='180'/>
            </Link>
        </div>
    </div>
    )
}

export default connect(null, {getDogs, getTemperaments})(MainPageContainer)