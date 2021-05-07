import React from 'react';

const CountryList = ({ countries, handleClickShow }) => {
    return (
        <div>
            {countries.map(country =>
                <div key={country.alpha2Code}>
                    {country.name}
                    <button onClick={() => handleClickShow(country)}>show</button>
                </div>
            )}
        </div>
    );
};

export default CountryList;