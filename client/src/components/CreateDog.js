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

const createRadioInputs = (labelName, handleChange) => {
    const weights = ['1 - 10', '10 - 25', '25 - 40', '40 - 55', '55 - 70', '70 - 90', '90 - 120'];
    const heights = ['5 - 20', '20 - 40', '40 - 60', '60 - 100', '100 - 140', '140 - 180', '180 - 220']

    let label = null;

    labelName === 'weight' ? label = weights : label = heights

    return (
        <div>
            {label.map((option, ix) => {
                return (
                    <div key={ix}>
                        <label>{option} {labelName === 'weight' ? 'kg' : 'cm'}</label>
                        <input value={option} onChange={handleChange} type="radio" name={labelName}></input>
                    </div>
                )    
            })}
        </div>
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
        height: '',
        weight: '',
        life_span: '',
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
        newTemp = filterInvalidCharts(newTemp);
        const temperaments = newTemp.split('-');
        return (
            temperaments
            .filter(temperament => temperament.length > 0)
            .map(temperament => temperament.charAt(0).toUpperCase() + temperament.slice(1))
        )
    }

    const filterInvalidCharts = (txt) => {
        let result = '';
        for (let i=0; i < txt.length; i++) {
            let ch = txt[i];
            if (ch.toUpperCase() !== ch.toLowerCase() || ch === '-') {result += ch}
        }
        return result;
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create New Dog</h2>
                <div>
                    <h4>Name</h4>
                    <input
                        value={inputs.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                    ></input>
                </div>
                <div>
                    <h4>Height</h4>
                    {createRadioInputs('height', handleChange)}
                </div>

                <div>
                    <h4>Weight</h4>
                    {createRadioInputs('weight', handleChange)}
                </div>
                <div>
                    <h4>Life Span</h4>
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
                <input type="submit" value="Send"></input>
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