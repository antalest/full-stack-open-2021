var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (max, blog) => {
    return (max > blog.likes) ? max : blog.likes
  }
  const highestLikes = blogs.reduce(reducer, 0)

  const favoriteBlog = blogs.find(blog => blog.likes === highestLikes)

  if (favoriteBlog) {
    return ({
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    })
  } else {
    return null
  }
}

const mostBlogs = blogs => {
  let blogsGroupedByAuthor = _(blogs)
  .groupBy(blog => blog.author)
  .map((value, key) => ({ author: key, blogs: value }))
  .value()

  if (blogsGroupedByAuthor.length !== 0) {
    const reducer = (mostAuthorBlogs, authorBlogs) => {
      return (mostAuthorBlogs.blogs.length > authorBlogs.blogs.length ? mostAuthorBlogs : authorBlogs)
    }

    const mostAuthorBlogs = blogsGroupedByAuthor.reduce(reducer)

    const result = {
      author: mostAuthorBlogs.author,
      blogs: mostAuthorBlogs.blogs.length
    }

    return result
  } else {
    return null
  }
}

const mostLikes = blogs => {
  let likesPerAuthor = _(blogs)
  .groupBy(blog => blog.author)
  .map((value, key) => ({
    author: key,
    likes: value.reduce((sum, blog) => sum + blog.likes, 0) }))
  .value()
  
  if (likesPerAuthor.length !== 0) {
    mostLikedAuthor = likesPerAuthor.reduce((mostLikedAuthor, author) => mostLikedAuthor.likes > author.likes ? mostLikedAuthor : author)
    return mostLikedAuthor
  } else {
    return null
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}