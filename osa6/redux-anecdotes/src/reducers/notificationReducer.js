const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'DELETE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    const milliseconds = seconds * 1000

    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION'
      })
    }, milliseconds)
  }
}

export default notificationReducer