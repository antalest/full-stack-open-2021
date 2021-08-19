import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(({ filter }) => filter)
  const anecdotes = useSelector(({ anecdotes }) =>
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  )
  const timeoutID = useSelector(({ notification }) => notification.timeoutID)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))

    dispatch(setNotification(`you voted '${anecdote.content}'`, 5, timeoutID))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList