const userReducer = (state = null, action) => {
  if (action.type === 'SET_USER') {
    return action.data.user
  }

  return state
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: {
      user
    }
  }
}

export default userReducer