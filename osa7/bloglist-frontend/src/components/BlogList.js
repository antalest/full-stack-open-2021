import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList