const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  if ( blog.user.toString() !== user._id.toString() ) {
    response.status(401).json({ error: 'unauthorized operation' })
  }

  await blog.remove()
    user.blogs = user.blogs.filter(blog => blog._id.toString() !== request.params.id)
    await user.save()
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const comment = request.body.comment
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)
  const savedBlog = await blog.save()

  response.json(savedBlog)
})

module.exports = blogsRouter