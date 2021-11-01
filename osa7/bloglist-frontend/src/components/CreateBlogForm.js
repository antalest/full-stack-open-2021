import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = ({ createBlog, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      await createBlog({
        title: title,
        author: author,
        url: url
      })

      setTitle('')
      setAuthor('')
      setURL('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h3>Create new</h3>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </Form.Group>
        <Button id='create-button' type="submit">create</Button>
      </Form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm