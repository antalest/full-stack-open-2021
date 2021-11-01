import React from 'react'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import BlogList from './BlogList'

const Home = ({
  setErrorMessage,
  handleLogIn,
  username, setUsername,
  password, setPassword,
  user,
  createBlogFormRef, createBlog,
  blogsOrderedByLikesDesc,
  updateBlog, removeBlog }) => {

  if (user === null) {
    return (
      <div>
        <LoginForm handleLogIn={handleLogIn} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabelShow="create new blog" buttonLabelHide="cancel" ref={createBlogFormRef}>
        <CreateBlogForm createBlog={createBlog} setErrorMessage={setErrorMessage} />
      </Togglable>
      <BlogList blogs={blogsOrderedByLikesDesc} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
    </div>
  )
}

export default Home