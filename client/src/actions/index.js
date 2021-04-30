const axios = require('axios');


export const getDogs = () => {
    
    return function (dispatch) {
        axios.get("http://localhost:3001/dogs", {responseType: 'json'})
            .then(res => {
                if (res.status === 200) {
                    return res.data.map(dog => {return {...dog, weight: dog.weight.metric, height: dog.height.metric}})
                } else {alert('Server Error Ocurred'); return []};
            })
            .then(dogs => {return dispatch({ type: "GET_DOGS", payload: dogs })})
            .catch(() => window.location.href = "/serverError")
    }
}

export const postDog = (payload) => {
    return function (dispatch) {
        let dogImg = null; 
        if (payload.image) {
            dogImg = {url: payload.image}
        }
        const body = {
            ...payload, 
            weight: {metric: payload.weight}, 
            height: {metric: payload.height}, 
            temperament: payload.temperaments,
            image: dogImg
        }
        axios.post("http://localhost:3001/dog", body, {responseType: 'json'})
            .then(res => {
                if (res.status === 200) {
                    const newDog = {...payload, id: res.data.id, created_by_user: true, image: dogImg}
                    return dispatch({type: 'ADD_DOG', payload: newDog})
                }
            })
            .catch(err => {
                console.log(err.response.data);
                const error = err.response.data 
                if (error.status === 400) {return dispatch({type: 'HANDLE_400', payload: error.message})};
                if (error.status === 409) {return dispatch({type: 'HANDLE_409', payload: error.message})};
            })
    }
}


export const getTemperaments = () => { 
    return function (dispatch) {
        axios.get("http://localhost:3001/temperament", {responseType: 'json'})
            .then(res => {
                return res.data;
            })
            .then(temperaments => {
                if (temperaments.length === 0) {
                    window.location.href = "/serverError";
                } else {
                    return dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments })
                }
            })
            .catch(() => window.location.href = "/serverError")
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

export const restartNewDogId = () => {
    return {type: 'RESTART_NEW_DOG_ID'}
}

export const resetErrors = () => {
    return {type: 'RESET_ERRORS'}
}

export const sortByWeights = (payload) => {
    return {type: 'SORT_WEIGHTS', payload}
}

export const searchName = (payload) => {
    return {type: 'SEARCH_NAME', payload}
}