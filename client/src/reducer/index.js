const initialState = {
    dogs: [],
    temperaments: [],
    dogsToDisplay: [],
    filtered: [],
}

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
    if (typeof dog.temperaments !== 'string' && dog.temperaments) {
        for (const temps of dog.temperaments) {
            if (temps.name.toLowerCase().includes(temperament.toLowerCase())) {return dog};
        }
    } else { 
        return false;
    };
}


const rootReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case 'GET_DOGS':
            return {...state, dogs: actions.payload, breeds: actions.payload.map(dog => dog.name)};
        
        case 'GET_TEMPERAMENTS':
            return {...state, temperaments: sortTemperaments(actions.payload)};

        case 'ADD_DOG':
            return {...state, dogs: state.dogs.concat(actions.payload)};

        case 'SORT_BREEDS':
            return {...state, filtered: sortBreeds(state.dogs, actions.payload)};

        case 'SORT_WEIGHTS': 
            return {...state, filtered: sortWeights(state.dogs, actions.payload)};

        case 'FILTER_BREEDS':
            if (actions.payload === '-') {
                return {...state, filtered: state.dogs};    
            } else {
                return {...state, filtered: state.dogs.filter(dog => dog.name === actions.payload)}
            };
        
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