import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'
import Filter from './components/Filter'

function App() {
  const weatherstack_api_key = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newWeather, setNewWeather] = useState('')

  const countryHook = () => {
    console.log('country effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(countryHook, [])
  console.log('render', countries.length, 'countries')

  const weatherHook = () => {
    console.log('weather effect')
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
    if (countriesToShow.length !== 1) {
      return
    }
    console.log('weatherHook props', countriesToShow[0].name)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weatherstack_api_key}&query=${countriesToShow[0].name}`)
      .then(response => {
        console.log(response.data)
        setNewWeather(response.data)
      })
  }

  useEffect(weatherHook, [newFilter, countries, weatherstack_api_key])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
  console.log('countriesToShow', countriesToShow)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleClickShow = ({ name }) => {
    setNewFilter(name)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      
      <Results countries={countriesToShow} handleClickShow={handleClickShow} newWeather={newWeather} />
    </div>
  );
}

export default App;
