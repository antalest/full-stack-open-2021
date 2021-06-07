import React from 'react'

const LoggedUser = ({ user, handleLogOut }) => (
  <div>
    {user.name} logged in <button onClick={handleLogOut}>log out</button>
  </div>
)

export default LoggedUser