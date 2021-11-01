import React from 'react'
import { Button } from 'react-bootstrap'

const LoggedUser = ({ user, handleLogOut }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      {user.name} logged in <Button variant="secondary" onClick={handleLogOut}>log out</Button>
    </div>
  )
}

export default LoggedUser