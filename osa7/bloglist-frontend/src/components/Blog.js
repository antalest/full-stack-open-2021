import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Blog = ({ blog, updateBlog, comment, setComment, handleCommentSend }) => {
  const handleLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      await updateBlog(newBlog)
    } catch (exception) {
      console.log(exception.error)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <Button onClick={handleLike}>like</Button></div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <Form onSubmit={handleCommentSend}>
        <Form.Control
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button id="send-button" type="submit">send</Button>
      </Form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>
            {comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blog