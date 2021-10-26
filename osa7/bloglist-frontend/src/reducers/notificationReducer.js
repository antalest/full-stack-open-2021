const notificationReducer = (state = null, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.data.notification
  }

  return state
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification
    }
  }
}

export default notificationReducer