import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => console.log(store.getState()))

export default store