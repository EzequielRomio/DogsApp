const initialState = {
    dogs: [],
    temperaments: [],
    dogsToDisplay: [],
    breeds: [],
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


const rootReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case 'GET_DOGS':
            return {...state, dogs: actions.payload, breeds: actions.payload.map(dog => dog.name)};
        
        case 'GET_TEMPERAMENTS':
            return {...state, temperaments: actions.payload};

        case 'ADD_DOG':
            return {...state, dogs: state.dogs.concat(actions.payload)};

        case 'SORT_BREEDS':
            return {...state, dogs: sortBreeds(state.dogs, actions.payload)};

        case 'SORT_WEIGHTS': 
            return {...state, dogs: sortWeights(state.dogs, actions.payload)};

        default:
            return state;
    };
}

export default rootReducer;