import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'
import Error from './components/Error'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const person = persons.find(p => p.name === newName)

    if (person) {
      if (!window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }

      personService
        .update(person.id, personObject)
        .then(updatedPerson => {
          const copyPersons = [...persons]
          copyPersons.splice(persons.findIndex(p => p.id === updatedPerson.id), 1, updatedPerson)
          setPersons(copyPersons)
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Updated phone number for ${updatedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } else {
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${createdPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (person) => {
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return
    }

    personService
      .remove(person.id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(p => p.id !== person.id))
        setNotificationMessage(`Removed ${person.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} removePerson={removePerson} />

    </div>
  )

}

export default App