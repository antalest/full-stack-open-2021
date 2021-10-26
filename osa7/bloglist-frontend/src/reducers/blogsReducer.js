import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_BLOGS':
    return action.data.blogs
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: {
      blogs
    }
  }
}

export const initilizeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogsReducer