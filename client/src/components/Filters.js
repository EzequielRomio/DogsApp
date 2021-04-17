import React from 'react';

export const Filters = ({filterLabel}) => {
    return (
        <div>
            <label>Filter by {filterLabel}</label>
            <select>
                <option>options will be mapped()</option>
            </select>
        </div>
    )
}