import React from 'react';

export const CreateDog = () => {
    return (
        <div>
            <form>
                <h2>Create New Dog</h2>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                    ></input>
                </div>
                <div>
                    <label>Max Height</label>
                    <input
                        type="text"
                        name="maxHeight"
                    ></input>
                </div>
                <div>
                    <label>Min Height</label>
                    <input
                        type="text"
                        name="minHeight"
                    ></input>
                </div>
                <div>
                    <label>Max Weight</label>
                    <input
                        type="text"
                        name="maxWeight"
                    ></input>
                </div>
                <div>
                    <label>Min Weight</label>
                    <input
                        type="text"
                        name="minWeight"
                    ></input>
                </div>
                <div>
                    <label>Life Span</label>
                    <input
                        type="text"
                        name="lifeSpan"
                    ></input>
                </div>
                <div>
                    <h3>Temperaments</h3>
                    <label>Temp 1</label>
                    <input
                        type="checkbox"
                        name="temp1"
                    ></input>
                </div>
                <div>
                    <h4>Create New Temperament</h4>
                    <label>Insert a temperament, or temperaments split by ", "</label>
                    <input type="text" name="newTemperament" placeholder="Adventurous, Active, Fun-loving"></input>
                </div>
            </form>
        </div>
    )
}