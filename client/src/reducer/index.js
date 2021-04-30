import {
    sortTemperaments, 
    sortWeights, 
    sortBreeds, 
    searchTemperament, 
    filterDuplicates, 
    searchName, 
    filterCreatedDogs
} from './helpers.js'


const initialState = {
    dogs: [],
    temperaments: [],
    breeds: [],
    filtered: [],
    newDogId: 0,
    errors: {400: false, 409: false}
}


const rootReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case 'GET_DOGS':
            const filteredDogs = filterDuplicates(actions.payload);
            return {...state, dogs: filteredDogs, breeds: filteredDogs.map(dog => dog.name)};

        case 'GET_TEMPERAMENTS':
            return {...state, temperaments: sortTemperaments(actions.payload)};

        case 'RESTART_NEW_DOG_ID':
            return {...state, newDogId: 0};
        
        case 'HANDLE_400':
            return {...state, errors: {400: true, 409: false}}
        
        case 'HANDLE_409':    
            return {...state, errors: {409: true, 400: false}}
        
        case 'RESET_ERRORS':
            return {...state, errors: {400: false, 409: false}}
        
        case 'ADD_DOG':
            return {...state, dogs: state.dogs.concat(actions.payload), newDogId: actions.payload.id};

        case 'SORT_BREEDS':
            return {...state, filtered: sortBreeds(state.dogs, actions.payload)};

        case 'SORT_WEIGHTS': 
            return {...state, filtered: sortWeights(state.dogs, actions.payload)};

        case 'FILTER_BREEDS':
            if (actions.payload === '-') {
                return {...state, filtered: state.dogs};    
            } else if (actions.payload === 'Recognized') {
                return {...state, filtered: state.dogs.filter(dog => !dog.created_by_user)}
            } else {
                return {...state, filtered: filterCreatedDogs(state.dogs)}
            }
        
        case 'FILTER_TEMPERAMENTS':
            if (actions.payload === '-') {
                return {...state, filtered: state.dogs};
            } else {
                return {...state, filtered: state.dogs.filter(dog => searchTemperament(dog, actions.payload))}
            };

        case 'SEARCH_NAME':
            return {...state, filtered: searchName(state.dogs, actions.payload)}    

        default:
            return state;
    };
}

export default rootReducer;