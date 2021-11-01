import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_USERS':
    return action.data.users
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    data: {
      users
    }
  }
}

export const initilizeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer