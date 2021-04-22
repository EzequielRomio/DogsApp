const axios = require('axios');

export const getDogs = () => {
    return function (dispatch) {
        axios.get("http://localhost:3001/dogs", {responseType: 'json'})
            .then(res => {
                if (res.status === 200) {
                    console.log(res.status)
                    return res.data.map(dog => {return {...dog, weight: dog.weight.metric, height: dog.height.metric}})
                } else {alert('Server Error Ocurred'); return []};
            })
            .then(dogs => {return dispatch({ type: "GET_DOGS", payload: dogs })})
            .catch((err) => {alert('An Error Ocurred trying to connect Server'); console.log(err)})
    }
}

export const postDog = (payload) => {
    return function (dispatch) {
        const body = {
            ...payload, 
            weight: {metric: payload.weight}, 
            height: {metric: payload.height}, 
            temperament: payload.temperaments
        }
        axios.post("http://localhost:3001/dog", body, {responseType: 'json'})
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const newDog = {...payload, id: res.data.id}
                    return dispatch({type: 'ADD_DOG', payload: newDog})
                } else if (res.status === 400) {
                    alert(res.data)
                }
            })
            .catch(err => {console.log(err); alert('This Dog Already Exist!')})
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

export const setPostNotOk = () => {
    return {type: 'POST_NOT_OK'}
}

export const sortByWeights = (payload) => {
    return {type: 'SORT_WEIGHTS', payload}
}

export const searchName = (payload) => {
    return {type: 'SEARCH_NAME', payload}
}