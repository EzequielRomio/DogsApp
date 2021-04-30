export const sortTemperaments = (temperaments) => {
    const mapped = temperaments.map((temp, ix) => {
        let value = temp.name.toLowerCase();
        return {ix, value}
    })

    mapped.sort((a, b) => (a.value).localeCompare(b.value));
    return mapped.map((element) => {return temperaments[element.ix]})
}

export const sortWeights = (array, orderAsc) => {
    const mapped = array.map((element, ix) => {
        let weight = element['weight'].split(' ')
        let value = parseInt(weight[0])
        return {ix, value}
    })

    orderAsc ? mapped.sort((a, b) => a.value - b.value) : mapped.sort((a, b) => b.value - a.value);
    return mapped.map((element) => {return array[element.ix]})
}

export const sortBreeds = (array, orderAsc) => {
    const mapped = array.map((element, ix) => {
        let value = element['name'].toLowerCase();
        return {ix, value}
    })

    orderAsc ? mapped.sort((a, b) => (a.value).localeCompare(b.value)) : mapped.sort((a, b) => (b.value).localeCompare(a.value));
    return mapped.map((element) => {return array[element.ix]})
}

export const searchTemperament = (dog, temperament) => {
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

export const filterDuplicates = (dogs) => {
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

export const searchName = (dogs, nameReq) => {
    const result = dogs.filter(dog => dog.name.toLowerCase().includes(nameReq.toLowerCase()))
    if (result.length === 0) {result.push('NOT_MATCH')}
    return result;
}

export const filterCreatedDogs = (dogs) => {
    const result = dogs.filter(dog => dog.created_by_user)
    if (result.length === 0) {result.push('NOT_MATCH')}
    return result;
}
