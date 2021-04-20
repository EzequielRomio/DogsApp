const axios = require('axios');

export const getDogs = () => {
    return function (dispatch) {
        axios.get("http://localhost:3001/dogs", {responseType: 'json'})
            .then(res => {
                console.log(res.data);
                return res.data.map(dog => {return {...dog, weight: dog.weight.metric}})
            }).then(dogs => {return dispatch({ type: "GET_DOGS", payload: dogs })})
    }
}

export const getTemperaments = () => { 
    return function (dispatch) {
        axios.get("http://localhost:3001/temperament", {responseType: 'json'})
            .then(res => {
                console.log(res.data);
                return res.data;
            }).then(temperaments => {return dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments })})
    }
}

export const getBreeds = () => {
    return {type: "GET_BREEDS"}
}

export const filterBreeds = (payload) => {
    // if (payload === '-') {
    //     return function (dispatch) {
    //         axios.get("http://localhost:3001/dogs", {responseType: 'json'})
    //             .then(res => {
    //                 console.log(res.data);
    //                 return res.data.map(dog => {return {...dog, weight: dog.weight.metric}})
    //             }).then(dogs => {return dispatch({ type: "FILTER_BREEDS", payload: {...dogs, payload}})})
    //     }
    
    // }
    return {type: 'FILTER_BREEDS', payload}
}

export const filterTemperaments = (payload) => {
    return {type: 'FILTER_TEMPERAMENTS', payload}
};

export const postDog = (payload) => {
    axios.post("http://localhost:3001/dog", payload, {responseType: 'json'})
        .then(res => {
            console.log(res.data);
            const id = res.data.id
            const newDog = {...payload, id}
            return {type: "ADD_DOG", newDog};
        });
}

export const sortByBreeds = (payload) => {
    return {type: 'SORT_BREEDS', payload}
}

export const sortByWeights = (payload) => {
    return {type: 'SORT_WEIGHTS', payload}
}