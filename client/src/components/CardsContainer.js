import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {DogCard} from './DogCard.js'; 
import {getDogs} from '../actions/index.js';


const CardsContainer = (props) => {
    //getDogs()
    return (
        <div>
            Here dogs will be displayed
            {/* map() dogcard with props.dogs */}
            {/* {dogs.map(dog => {
                <Link to={'/dogs/details'}>
                    <DogCard dog={{name: dog.name, image: dog.image}} />
                <Link />
                })} */}
            <Link to={'/dogs/details'}>
                <DogCard dog={{name: 'Waterdog', image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg'}} />
            </Link>
            {console.log(props)}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        dogs: state.dogs
    }
}

export default connect(mapStateToProps, {getDogs})(CardsContainer);