import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {postDog, getTemperaments, restartNewDogId, resetErrors} from '../actions/index.js';
import {Image} from './Image.js'
import defaultImg from '../images/default.png'

const displayValues = (inputs) => {
    const result = [];
    for (const k in inputs) {
        if (k !== 'temperaments') {result.push(k)}
    }
    return (
        <div>
            {result.map(k =>{
                return (
                    <div>
                        <h4>{k} :</h4>
                        <h5>{inputs[k]}</h5>
                    </div>
                )
            })}
        </div>
    )
}

const displaySelectedTemperaments = (temperamentsChecked, removeTemperament) => {
    const result = [];
    for (const temp in temperamentsChecked) {
        if (temperamentsChecked[temp]) {console.log(temp); result.push(temp)}
    }

    return (
        <ul >
            {result.map(temp => {
                return (
                    <p key={temp} value={temp}>
                        {temp}
                        <button className={'remove-button'} onClick={(e) => removeTemperament(e)} value={temp} >x</button> 
                    </p>
                )
            })}
        </ul>
    )
}

const checkTemps = (temperamentsChecked) => {
    for (const temp in temperamentsChecked) {
        if (temperamentsChecked[temp]) {console.log(temp); return true}
    }
    return false;    
}

const createRadioInputs = (labelName, handleChange) => {
    const weights = ['1 - 10', '10 - 25', '25 - 40', '40 - 55', '55 - 70', '70 - 90', '90 - 120'];
    const heights = ['5 - 20', '20 - 40', '40 - 60', '60 - 100', '100 - 140', '140 - 180', '180 - 220']

    let label = null;

    labelName === 'weight' ? label = weights : label = heights

    return (
        <div className={'radio-inputs'}>
            {label.map((option, ix) => {
                return (
                    <div key={ix}>
                        <label>{option} {labelName === 'weight' ? 'kg' : 'cm'}</label>
                        <input value={option} onChange={handleChange} type="radio" name={labelName} required></input>
                    </div>
                )    
            })}
        </div>
    )

}

const displayOptions = (filter, handleChange) => {
    return filter.map((label, ix)=> {
        return (
            <option name={label.name} onChange={(e) => handleChange(e)} key={ix}>{label.name}</option>
        )
    })
}


const validateBody = (inputs, temperamentsChecked, customTemperament) => {
    const errors = {
        name: null,
        height: null,
        weight: null,
        temperaments: null,
    }
    if (!inputs.name || inputs.name.length < 2) {errors.name = 'Name must have at least 2 letters!'}; 
    if (!inputs.height) {errors.height = 'Select a Height'};
    if (!inputs.weight) {errors.weight = 'Select a Weight'};
    if (!inputs.temperaments && !customTemperament && !checkTemps(temperamentsChecked)) {
        errors.temperaments  = 'Select or Create at least one temperament!'
    };
    return errors
}

const hasErrors = (errors) => {
    for (const k in errors) {
        if (errors[k]) {console.log(errors[k]); return true};
    }
    return false;
}

/*********** Component starts here *************/
const CreateDog = ({temperamentList, postDog, getTemperaments, newDogId, restartNewDogId, postErrors, resetErrors}) => {
    temperamentList.length === 0 && getTemperaments(); 
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
    const [joinedTemperaments, setJoinedTemperaments] = useState('')
    const [errors, setErrors] = useState({})
    const [submited, setSubmited] = useState(false);

    const history = useHistory()

    /****** useEffect *******/
    useEffect(() => {
        if (submited && hasErrors(errors)) {
            setSubmited(false);
            if (errors.temperaments) {alert('Select at least one temperament!')}
        } else if (submited) {
            postDog(inputs);
        }
        setSubmited(false);    
    }, [inputs])


    useEffect(()=> {
        setJoinedTemperaments(joinTemperaments(temperamentsChecked, customTemperament));
    }, [temperamentsChecked, customTemperament])

    
    useEffect(() => {
        if (newDogId !== 0) {
            const id = newDogId
            restartNewDogId()
            history.push(`/dogs/details/${id}`)
            window.scrollTo(0, 0)
        } else if (postErrors[409]) {
            alert('This dog already exist, insert a diferent Name')
            resetErrors()
        } else if (postErrors[400]) {
            console.log('Bad body request!')
            alert('Oops! An error ocurred')
            window.location.reload()
        }
    })


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
        setSubmited(true);
        setInputs({
            ...inputs,
            temperaments: joinedTemperaments //joinTemperaments(temperamentsChecked, customTemperament)
        })
        setErrors(validateBody(inputs, temperamentsChecked, customTemperament))
    }

    const removeTemperament = (e) => {
        e.preventDefault();
        setTemperamentsChecked({
            ...temperamentsChecked,
            [e.target.value]: false
        })
    }

    const temperamentsChange = (e) => {
        e.preventDefault();
        setTemperamentsChecked({
            ...temperamentsChecked,
            [e.target.value]: true
        })
    }


    /*********** Auxiliar methods **************/ 
    const joinTemperaments = (temperamentsChecked, customTemperament) => {
        const result = [];
        for (const temp in temperamentsChecked) {
            if (temperamentsChecked[temp]) {console.log(temp); result.push(temp)}
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
            <h2>Create New Dog</h2>
            <div className={'form-image-container'}>
                
                <form onSubmit={handleSubmit} >
                    
                    <div>
                        <h4>Name</h4>
                        <input
                            className={'inputs'}
                            value={inputs.name}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            required
                        ></input>
                    </div>
                    <div className={'weight-height-container'}>
                        <div className={'wh-auxiliar'}>
                            <h4>Height</h4>
                            {createRadioInputs('height', handleChange)}
                        </div>
                        <div className={'wh-auxiliar'}>
                            <h4>Weight</h4>
                            {createRadioInputs('weight', handleChange)}
                        </div>
                    </div>
                    <div>
                        <h4>Life Span</h4>
                        <input
                            className={'inputs'}
                            value={inputs.life_span}
                            onChange={handleChange}
                            type="text"
                            name="life_span"
                        ></input>
                    </div>
                    <div >
                        <h4>Temperaments</h4>
                        
                        <select onChange={(e) => temperamentsChange(e)}>
                            {(temperamentList && temperamentList.length > 0 && displayOptions(temperamentList, temperamentsChange))}
                        </select>

                        
                        <h4>Selected Temperaments: </h4>
                        {displaySelectedTemperaments(temperamentsChecked, removeTemperament)}            
                            
                    </div>
                    <div className={'temps-container'}>
                        <h4>Create New Temperament</h4>
                        <label>Insert a new temperament, or temperaments separated by "-"</label>
                        <input type="text" className={'inputs'} name="newTemperament" onChange={handleNewTemperament} placeholder="Adventurous-Active-Fun-loving"></input>
                    </div>
                    <input type="submit" value="Send" className={'send-button'}></input>
                </form>

                <div className={'form-separator'}></div>

                <div className={'preview'}>
                    <h4>Preview</h4>
                    <Image imgToDisplay={defaultImg} imgWidth={'50%'} imgHeight={'50%'}></Image>
                    {displayValues(inputs)}
                </div>


            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        temperamentList: state.temperaments, 
        // temperamentList is an alias to prevent overwriting temperaments inputs property
        newDogId: state.newDogId,
        postErrors: state.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postDog: body => dispatch(postDog(body)),
        getTemperaments: () => dispatch(getTemperaments()),
        restartNewDogId: () => dispatch(restartNewDogId()),
        resetErrors: () => dispatch(resetErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDog)