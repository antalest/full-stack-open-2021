import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initilizeBlogs, setBlogs } from './reducers/blogsReducer'
import { initilizeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import Notification from './components/Notification'
import Error from './components/Error'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Home from './components/Home'
import './index.css'
import Header from './components/Header'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const [errorMessage, setErrorMessage] = useState(null)
  const [comment, setComment] = useState('')

  const createBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initilizeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [dispatch])

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
      userService.setToken(user.token)
      dispatch(setUser(user))
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
    userService.setToken(null)
    dispatch(setUser(null))
  }

  const createBlog = async (blogObject) => {
    const blog = await blogService.create(blogObject)

    dispatch(setBlogs(blogs.concat({ ...blog, user: user })))

    createBlogFormRef.current.toggleVisibility()

    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`))
    setTimeout(() => {
      dispatch(setNotification(null))
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
    dispatch(setBlogs(updatedBlogs))
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    dispatch(setBlogs(updatedBlogs))
  }

  const userIdMatch = useRouteMatch('/users/:id')
  const usersUser = userIdMatch
    ? users.find(user => user.id === userIdMatch.params.id)
    : null

  const blogIdMatch = useRouteMatch('/blogs/:id')
  const blogListBlog = blogIdMatch
    ? blogs.find(blog => blog.id === blogIdMatch.params.id)
    : null

  const handleCommentSend = async (event) => {
    event.preventDefault()

    try {
      const commentObject = {
        comment
      }

      const updatedBlog = await blogService.comment(blogListBlog.id, commentObject)
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === updatedBlog.id) {
          return { ...blog, comments: updatedBlog.comments }
        } else {
          return blog
        }
      })
      dispatch(setBlogs(updatedBlogs))

      setComment('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div>
        <Notification message={notification} />
        <Error message={errorMessage} />
        <Header user={user} handleLogOut={handleLogOut} />
      </div>

      <Switch>
        <Route path="/users/:id">
          {user ?
            <User user={usersUser} /> :
            <Redirect to="/" />
          }
        </Route>
        <Route path="/users">
          {user ? <Users users={users} /> : <Redirect to="/" />}
        </Route>
        <Route path="/blogs/:id">
          {user ?
            <Blog blog={blogListBlog} updateBlog={updateBlog} comment={comment} setComment={setComment} handleCommentSend={handleCommentSend} /> :
            <Redirect to="/" />}
        </Route>
        <Route path="/">
          <Home errorMessage={errorMessage} setErrorMessage={setErrorMessage}
            handleLogIn={handleLogIn}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            notification={notification}
            user={user} handleLogOut={handleLogOut}
            createBlogFormRef={createBlogFormRef} createBlog={createBlog}
            blogsOrderedByLikesDesc={blogsOrderedByLikesDesc}
            updateBlog={updateBlog} removeBlog={removeBlog} />
        </Route>
      </Switch>
    </div>
  )
}

export default App