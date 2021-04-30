const initialState = {
    dogs: [],
    temperaments: [],
    breeds: [],
    filtered: [],
    newDogId: 0,
    errors: {400: false, 409: false}
}


/****************** FUNCTIONS *******************/
const sortTemperaments = (temperaments) => {
    const mapped = temperaments.map((temp, ix) => {
        let value = temp.name.toLowerCase();
        return {ix, value}
    })

    mapped.sort((a, b) => (a.value).localeCompare(b.value));
    return mapped.map((element) => {return temperaments[element.ix]})
}

const sortWeights = (array, orderAsc) => {
    const mapped = array.map((element, ix) => {
        let weight = element['weight'].split(' ')
        let value = parseInt(weight[0])
        return {ix, value}
    })

    orderAsc ? mapped.sort((a, b) => a.value - b.value) : mapped.sort((a, b) => b.value - a.value);
    return mapped.map((element) => {return array[element.ix]})
}

const sortBreeds = (array, orderAsc) => {
    const mapped = array.map((element, ix) => {
        let value = element['name'].toLowerCase();
        return {ix, value}
    })

    orderAsc ? mapped.sort((a, b) => (a.value).localeCompare(b.value)) : mapped.sort((a, b) => (b.value).localeCompare(a.value));
    return mapped.map((element) => {return array[element.ix]})
}

const searchTemperament = (dog, temperament) => {
    const isString = typeof dog.temperaments === 'string';

    if (dog.temperaments && !isString) { //temperaments format is Array
        for (const temps of dog.temperaments) {
            if (temps.name.toLowerCase().includes(temperament.toLowerCase())) {return dog};
        }

    } else if (isString){ //temperaments is string and is not undefined
        if (dog.temperaments.toLowerCase().includes(temperament.toLowerCase())) {return dog}; 
    
    } else { //if temperaments is undefined returns false
        return false;
    }

}

const filterDuplicates = (dogs) => {
    const filtered = {};
    const result = [];
    for (const dog of dogs) {
        filtered[dog.name] = dog
        //console.log(filtered)
    }
    for (const dog in filtered) {
        result.push(filtered[dog])
        //console.log(result)
    }
    return result;
}

/****************** REDUCER *******************/
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
                return {...state, filtered: state.dogs.filter(dog => dog.created_by_user)}
            }
        
        case 'FILTER_TEMPERAMENTS':
            if (actions.payload === '-') {
                return {...state, filtered: state.dogs};
            } else {
                return {...state, filtered: state.dogs.filter(dog => searchTemperament(dog, actions.payload))}
            };

        case 'SEARCH_NAME':
            return {...state, filtered: state.dogs.filter(dog => dog.name.toLowerCase().includes(actions.payload.toLowerCase()))}    

        default:
            return state;
    };
}

export default rootReducer;