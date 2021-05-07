import React from 'react';

const Filter = ({ newFilter, handleFilterChange }) => {
    return (
        <div>
            find countries <input value={newFilter} onChange={handleFilterChange}></input>
        </div>
    );
};

export default Filter;