  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response  => {
        setResources(response.data)
      })
      .catch(error => console.log('haku epäonnistui'))
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        setResources(resources.concat(response.data))
        return response.data
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const Notes = ({ notes }) => {
  if (notes && notes.length > 0) {
    return (
      <div>
        {notes.map(n => <p key={n.id}>{n.content}</p>)}
      </div>
    )
  } else {
    return null
  }
}

const Persons = ({ persons }) => {
  if (persons && persons.length > 0) {
    return (
      <div>
        {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
      </div>
    )
  } else {
    return null
  }
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      <Notes notes={notes}/>

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      <Persons persons={persons} />
    </div>
  )
}

export default App