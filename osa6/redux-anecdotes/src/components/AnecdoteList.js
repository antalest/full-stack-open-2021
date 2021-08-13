import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { deleteNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(({ filter }) => filter)
  const anecdotes = useSelector(({ anecdotes }) =>
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  )
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
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