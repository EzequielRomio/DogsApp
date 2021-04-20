import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const createTemperamentsCheckBox = (temperamentList, temperamentsChecked, handleChange) => {
    return (
        temperamentList.map(temp => {
            return (
            <div style={{margin: '10px', width: '180px'}}>
                <label>{temp.name}</label>
                    <input
                        key={temp.id}
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
// createTemperamentsCheckBox(temperamentList, auxTemperaments, handleChange)
const CreateDog = ({temperamentList}) => {
    const [inputs, setInputs] = useState({
        name: '',
        maxHeight: '',
        minHeight: '',
        maxWeight: '',
        minWeight: '',
        life_span: '',
        temperaments: ''
    })
    //const [selectedTemperaments, setSelectedTemperaments] = useState([])
    const [temperamentsChecked, setTemperamentsChecked] = useState({})
    const [customTemperament, setCustomTemperament] = useState('')

    const handleChange = (e) => {
        // VALIDAR FORM / ERRORES
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const parseNewTemperament = (newTemp) => {
        const temperaments = newTemp.split('-');
        const result = temperaments.map((temp, ix) => {
            let txt = '';
            if (temp.length > 0) {
                for (let i=0; i<temp.length; i++) {
                    let ch = temp[i];
                    i === 0 ? txt += ch.toUpperCase() : txt += ch;
                };
                if (ix < temperaments.length -1) {txt += ', '};
            };
            return txt;
        })

        return result.join('')
    }

    const handleNewTemperament = (e) => {
        e.preventDefault();
        setCustomTemperament(parseNewTemperament(e.target.value));
    }

    const checkboxChange = (e) => {
        setTemperamentsChecked({
            ...temperamentsChecked,
            [e.target.value]: e.target.checked
        })
    }

    useEffect(() => {
        console.log(customTemperament)
    
    }, [inputs, temperamentsChecked, customTemperament])

    return (
        <div>
            <form>
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
                        type="text"
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
                            createTemperamentsCheckBox(temperamentList, temperamentsChecked, checkboxChange)
                        }

                    </div>
                        
                </div>
                <div>
                    <h4>Create New Temperament</h4>
                    <label>Insert a new temperament, or temperaments separated by "-"</label>
                    <input type="text" name="newTemperament" onChange={handleNewTemperament} placeholder="Adventurous-Active-Fun-loving"></input>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        temperamentList: state.temperaments 
        //temperamentList is an alias to prevent overwriting temperaments inputs property
    }
}

export default connect(mapStateToProps)(CreateDog)