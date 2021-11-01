import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogIn, username, password, setUsername, setPassword }) => (
  <div>
    <h2>Login</h2>
    <Form onSubmit={handleLogIn}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button id='login-button' type="submit">login</Button>
      </Form.Group>
    </Form>
  </div>
)

export default LoginForm