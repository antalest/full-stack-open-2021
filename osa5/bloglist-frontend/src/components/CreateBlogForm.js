import React from 'react'

const CreateBlogForm = ({ handleCreateBlog, title, setTitle, author, setAuthor, url, setURL }) => {
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

export default CreateBlogForm