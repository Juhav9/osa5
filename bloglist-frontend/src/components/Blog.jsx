import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, remove }) => {
  const [view, setView] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('LoggedUser')
    if(loggedJSON){
      const user = JSON.parse(loggedJSON)
      if(user.username===blog.user.username){
        setShowDelete(true)
      }
    }
  }, [])
  const changeView = () => {
    setView(!view)
  }
  const handleUpdate = async () => {
    await updateLike(blog)
  }

  return(
    <li className='blog' data-testId='blog'>
      <span>{blog.title} </span>
      <span> {blog.author}</span>
      {!view && <button onClick={changeView}>view</button>}
      {view && <button onClick={changeView}>hide</button>}
      {view && <div>
        <div>
          <span>likes: {blog.likes}</span>
          <button onClick={handleUpdate}>like</button>
        </div>
        <span>
          {blog.url} &ensp;
        </span>
        <span>
          {blog.user.name}
        </span>
        {showDelete && <button onClick={() => remove(blog)}>remove</button>}
      </div>}
    </li>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog