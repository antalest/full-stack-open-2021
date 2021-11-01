import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th scope='col'></th>
            <th scope='col'>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users