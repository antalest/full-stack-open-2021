import React from 'react'
import { Link } from 'react-router-dom'
import LoggedUser from './LoggedUser'
import { Navbar, Nav } from 'react-bootstrap'

const Header = ({ user, handleLogOut }) => {
  const margin = {
    marginBottom: 10
  }
  const linkPadding = {
    padding: 10
  }

  return (
    <div>
      <Navbar style={margin} collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={linkPadding} to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={linkPadding} to="/users">Users</Link>
            </Nav.Link>
          </Nav>
          <LoggedUser user={user} handleLogOut={handleLogOut} />
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header