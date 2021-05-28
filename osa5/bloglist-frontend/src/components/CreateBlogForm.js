import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default CreateBlogForm