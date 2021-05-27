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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    createBlogFormRef.current.toggleVisibility()
    
    try {
      const blog = await blogService.create({
        title, author, url
      })
      
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setURL('')
      setNotificationMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlogFormRef = useRef()

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
      <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
        <CreateBlogForm handleCreateBlog={handleCreateBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setURL={setURL}/>      
      </Togglable>
      <BlogList blogs={blogs} />
    </div>
  )
}

export default App