const initialState = {
  notification: '',
  timeoutID: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.notification
      }
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notification: ''
      }
    case 'SET_TIMEOUTID':
      return {
        ...state,
        timeoutID: action.timeoutID
      }
    default:
      return state
  }
}

export const setNotification = (notification, seconds, timeoutID) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    console.log(`about to clear ${timeoutID}`)
    clearTimeout(timeoutID)

    const milliseconds = seconds * 1000

    const newTimeoutID = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION'
      })
    }, milliseconds)

    dispatch({
      type: 'SET_TIMEOUTID',
      timeoutID: newTimeoutID
    })
  }
}

export default notificationReducer