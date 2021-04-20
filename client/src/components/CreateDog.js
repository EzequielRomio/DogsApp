import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const createTemperamentsCheckBox = (temperamentList, handleChange) => {
    return (
        temperamentList.map(temp => {
            return (
            <div key={temp.id} style={{margin: '10px', width: '180px'}}>
                <label>{temp.name}</label>
                    <input
                        onChange={handleChange}
                        value={temp.name}
                        type="checkbox"
                        name={temp.name}
                    ></input>
            </div>
            )
        })   
    )    
}

const validateBody = (inputs) => {
    const errors = {}
    if (!inputs.name || inputs.name.length < 2) {
        errors.name = 'Name must have al least 2 letters!'
    } 
    //if (!maxHeight)
}

/*********** Component starts here *************/
const CreateDog = ({temperamentList}) => {
    
    /****** Local states ******/
    const [inputs, setInputs] = useState({
        name: '',
        maxHeight: '' || '0',
        minHeight: '' || '0',
        maxWeight: '' || '0',
        minWeight: '' || '0',
        life_span: '' || '0',
        temperaments: ''
    })
    const [temperamentsChecked, setTemperamentsChecked] = useState({})
    const [customTemperament, setCustomTemperament] = useState([])


    /****** useEffect *******/
    useEffect(() => {
        console.log(customTemperament, 'custom Temperaments')
        console.log(inputs)
    
    }, [inputs, temperamentsChecked, customTemperament])


    /******* Events Handlers ********/
    const handleChange = (e) => {
        // VALIDAR FORM / ERRORES
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const handleNewTemperament = (e) => {
        e.preventDefault();
        setCustomTemperament(parseNewTemperament(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            temperaments: joinTemperaments(temperamentsChecked, customTemperament)
        })
    }

    const checkboxChange = (e) => {
        setTemperamentsChecked({
            ...temperamentsChecked,
            [e.target.value]: e.target.checked
        })
    }


    /*********** Auxiliar methods **************/ 
    const joinTemperaments = (temperamentsChecked, customTemperament) => {
        const result = [];
        for (const temp in temperamentsChecked) {
            if (temperamentsChecked[temp]) {result.push(temp)}
        }
        return result.concat(customTemperament).join(', ')
    }

    const parseNewTemperament = (newTemp) => {
        //if (newTemp.includes(' ')) {alert('Only Letters or - !')}
        const temperaments = newTemp.split('-');
        return (
            temperaments
            .filter(temperament => temperament.length > 0 && validateTemperament(temperament))
            .map(temperament => temperament.charAt(0).toUpperCase() + temperament.slice(1))
        )
    }

    const validateTemperament = (temperament) => {
        const letters = temperament.split('');
        let isValid = true;
        for (const ch of letters) {
            if (ch.toUpperCase() === ch.toLowerCase()) {isValid = false; break}
        }
        return isValid;
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create New Dog</h2>
                <div>
                    <label>Name</label>
                    <input
                        value={inputs.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                    ></input>
                </div>
                <div>
                    <label>Max Height</label>
                    <input
                        value={inputs.maxHeight}
                        onChange={handleChange}
                        type="number"
                        name="maxHeight"
                    ></input>
                </div>
                <div>
                    <label>Min Height</label>
                    <input
                        value={inputs.minHeight}
                        onChange={handleChange}
                        type="text"
                        name="minHeight"
                    ></input>
                </div>
                <div>
                    <label>Max Weight</label>
                    <input
                        value={inputs.maxWeight}
                        onChange={handleChange}
                        type="text"
                        name="maxWeight"
                    ></input>
                </div>
                <div>
                    <label>Min Weight</label>
                    <input
                        value={inputs.minWeight}
                        onChange={handleChange}
                        type="text"
                        name="minWeight"
                    ></input>
                </div>
                <div>
                    <label>Life Span</label>
                    <input
                        value={inputs.life_span}
                        onChange={handleChange}
                        type="text"
                        name="life_span"
                    ></input>
                </div>
                <div>
                    <h3>Temperaments</h3>
                    
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        {
                            temperamentList && 
                            temperamentList.length > 0 &&
                            createTemperamentsCheckBox(temperamentList, checkboxChange)
                        }

                    </div>
                        
                </div>
                <div>
                    <h4>Create New Temperament</h4>
                    <label>Insert a new temperament, or temperaments separated by "-"</label>
                    <input type="text" name="newTemperament" onChange={handleNewTemperament} placeholder="Adventurous-Active-Fun-loving"></input>
                </div>
                <input type="submit" value="Send Data"></input>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        temperamentList: state.temperaments 
        // temperamentList is an alias to prevent overwriting temperaments inputs property
    }
}

export default connect(mapStateToProps)(CreateDog)