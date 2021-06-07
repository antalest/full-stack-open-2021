import React from 'react'
const LoginForm = ({ handleLogIn, username, password, setUsername, setPassword }) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogIn}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  </div>
)

export default LoginForm