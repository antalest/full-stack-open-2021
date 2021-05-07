import React from 'react';

const Weather = ({ country, newWeather }) => {
    if (newWeather !== '') {
        console.log(newWeather.current.temperature)
        return (
            <div>
                <h2>Weather in {country.name}</h2>
                <div>
                    <b>temperature:</b> {newWeather.current.temperature} Celcius
                </div>
                <div>
                    {newWeather.current.weather_icons.map(url => <img key={url} src={url} />)}
                </div>
                <div>
                    <b>wind:</b> {newWeather.current.wind_speed} mph direction {newWeather.current.wind_dir}
                </div>
            </div>
        );
    }

    return (
        null
    )
};

export default Weather;