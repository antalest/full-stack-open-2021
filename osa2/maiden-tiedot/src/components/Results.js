import React from 'react';
import Country from './Country';
import CountryList from './CountryList';
import Weather from './Weather';

const Results = ({ countries, handleClickShow, newWeather }) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length > 1) {
        return (
            <CountryList countries={countries} handleClickShow={handleClickShow} />
        )
    }
    
    if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
                <Weather country={countries[0]} newWeather={newWeather}/>
            </div>
        )
    }

    return (
        null
    )
}

export default Results;