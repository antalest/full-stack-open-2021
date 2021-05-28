import React, { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LoggedUser from './components/LoggedUser'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import './index.css'
import Error from './components/Error'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const createBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogsOrderedByLikesDesc = blogs.sort((a, b) => b.likes - a.likes)

  const handleLogIn = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    const blog = await blogService.create(blogObject)

    setBlogs(blogs.concat({ ...blog, user: user }))

    createBlogFormRef.current.toggleVisibility()

    setNotificationMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === updatedBlog.id) {
        return { ...blog, likes: updatedBlog.likes }
      } else {
        return blog
      }
    })
    setBlogs(updatedBlogs)
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
  }


  if (user === null) {
    return (
      <div>
        <Error message={errorMessage} />
        <LoginForm handleLogIn={handleLogIn} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <h2>Blogs</h2>
      <LoggedUser user={user} handleLogOut={handleLogOut} />
      <br />
      <Togglable buttonLabelShow="create new blog" buttonLabelHide="cancel" ref={createBlogFormRef}>
        <CreateBlogForm createBlog={createBlog} setErrorMessage={setErrorMessage} />
      </Togglable>
      <BlogList blogs={blogsOrderedByLikesDesc} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
    </div>
  )
}

export default App