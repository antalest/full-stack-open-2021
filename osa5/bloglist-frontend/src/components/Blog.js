import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const toggleShowFullInfo = () => {
    setShowFullInfo(!showFullInfo)
  }

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      await updateBlog(newBlog)
    } catch (exception) {
      console.log(exception.error)
    }
  }

  const handleRemove = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
        await removeBlog(blog.id)
      }
    } catch (exception) {
      console.log(exception.error)
    }
  }

  const showWhenUserIsCreator = { display: user && blog.user && user.username === blog.user.username ? '' : 'none' }

  if (showFullInfo) {
    return (
      <div style={blogStyle} className={blog}>
        <div onClick={toggleShowFullInfo} className="blogTitle">
          {blog.title} {blog.author} <button id='hide-button' onClick={toggleShowFullInfo}>hide</button>
        </div>
        <div className="blogURL">{blog.url}</div>
        <div>likes {blog.likes} <button id='like-button' onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenUserIsCreator}>
          <button id='remove-button' onClick={handleRemove}>remove</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={toggleShowFullInfo} className="blogTitle">
          {blog.title} {blog.author} <button id='view-button' onClick={toggleShowFullInfo}>view</button>
        </div>
      </div>
    )
  }
}

export default Blog