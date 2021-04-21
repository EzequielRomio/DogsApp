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

export const postDog = (payload) => {
    return function (dispatch) {
        const body = {...payload, weight: {metric: payload.weight}, height: {metric: payload.height}, temperament: payload.temperaments}
        console.log(body, 'soy el body')
        axios.post("http://localhost:3001/dog", body, {responseType: 'json'})
            .then(res => {
                console.log(res, res.data)
                const newDog = {...payload, id: res.data.id}
                return dispatch({type: 'ADD_DOG', payload: newDog})
            })
    }
}


export const getTemperaments = () => { 
    return function (dispatch) {
        axios.get("http://localhost:3001/temperament", {responseType: 'json'})
            .then(res => {
                return res.data;
            }).then(temperaments => {return dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments })})
    }
}

export const getBreeds = () => {
    return {type: "GET_BREEDS"}
}

export const filterBreeds = (payload) => {
    return {type: 'FILTER_BREEDS', payload}
}

export const filterTemperaments = (payload) => {
    return {type: 'FILTER_TEMPERAMENTS', payload}
};

export const sortByBreeds = (payload) => {
    return {type: 'SORT_BREEDS', payload}
}

export const sortByWeights = (payload) => {
    return {type: 'SORT_WEIGHTS', payload}
}

export const searchName = (payload) => {
    return {type: 'SEARCH_NAME', payload}
}