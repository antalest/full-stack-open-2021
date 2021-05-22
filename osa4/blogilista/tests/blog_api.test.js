const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific titled blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(b => b.title)

  expect(contents).toContain('React patterns')
})

test('the field identifying blogs is called id', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Test blog",
    author: "tester",
    url: "https://testing.com/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain('Test blog')
})

test('if added blog has no value set for likes, value is set to 0', async () => {
  const newBlog = {
    title: "Test blog",
    author: "tester",
    url: "https://testing.com/"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
  
  expect(response.body.likes).toBe(0)
})

test('adding blog with no title and url, gets responded with status 400 bad request', async () => {
  const newBlog = {
    author: "tester"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog can be deleted by id', async () => {
  const blog = new Blog({
    title: "Test blog",
    author: "tester",
    url: "https://testing.com/"
  })

  await blog.save()

  await api
    .delete(`/api/blogs/${blog._id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('likes of blog can be updated by id', async () => {
  const blog = new Blog({
    title: "Test blog",
    author: "tester",
    url: "https://testing.com/"
  })

  await blog.save()

  const updatedLikes = {
    author: "tester22222",
    likes: 3
  }

  const response = await api
    .put(`/api/blogs/${blog._id}`)
    .send(updatedLikes)

  expect(response.body.likes).toBe(updatedLikes.likes)
})

afterAll(() => {
  mongoose.connection.close()
})