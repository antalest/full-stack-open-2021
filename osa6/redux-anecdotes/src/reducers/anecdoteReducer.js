import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'UPDATE_ANECDOTE':
      const id = action.data.id

      const newAnecdote = {
        id,
        content: action.data.content,
        votes: action.data.votes
      }

      return state.map(a =>
        a.id !== id ? a : newAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    
    const data = await anecdotesService.update(anecdote.id, votedAnecdote)

    dispatch ({
      type: 'UPDATE_ANECDOTE',
      data
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer