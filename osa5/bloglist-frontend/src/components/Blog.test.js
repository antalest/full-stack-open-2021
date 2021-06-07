import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let blog
let user

beforeAll(() => {
  blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Antti A',
    url: 'https://blog.com/component-testing',
    likes: 1,
    user: {
      username: 'ana'
    }
  }

  user = {
    username: 'ana'
  }
})

test('renders title and author but not url nor likes', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Antti A'
  )
  expect(component.container).not.toHaveTextContent(
    'https://blog.com/component-testing'
  )
  expect(component.container).not.toHaveTextContent(
    '1'
  )
})

test('after clicking the view button renders also url and likes', async () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Antti A'
  )
  expect(component.container).toHaveTextContent(
    'https://blog.com/component-testing'
  )
  expect(component.container).toHaveTextContent(
    '1'
  )
})

test('if like button is pressed twice, its event handler will be called twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})