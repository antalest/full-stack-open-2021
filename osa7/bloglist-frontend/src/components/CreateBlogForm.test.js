import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'


test('when form fields are filled and form is submitted, callback function is called once with correct arguments', () => {
  const createBlog = jest.fn()
  let component
  component = render(
    <CreateBlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Antti A' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://blog.com/testing-forms' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('Antti A')
  expect(createBlog.mock.calls[0][0].url).toBe('https://blog.com/testing-forms')
})