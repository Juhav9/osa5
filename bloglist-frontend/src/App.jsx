import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LogInForm from './components/LogInForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable  from './components/Togglable'

const App = () => {
  console.log('app render')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()
  const sortBlogs = (a,b) => {
    if(a.likes>b.likes) return -1
    if(a.likes<b.likes) return 1
    return 0
  }

  const createNewBlog = async (blog) => {
    try{
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      setMessage(`new blog ${response.title} . By ${response.author} added`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      },3000)

    }catch{
      console.log('something went wrong')
    }
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs.sort(sortBlogs)))
  }, [])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('LoggedUser')
    if(loggedJSON){
      const user = JSON.parse(loggedJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('LoggedUser')
    setUser(null)
  }

  const updateLike = async (blog) => {
    const updated = await blogService.update(blog)
    const updatedBlogs = blogs.map(b => b.id===updated.id ? updated : b)
    const sorted = updatedBlogs.sort(sortBlogs)
    setBlogs(sorted)
  }

  const remove = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await blogService.remove(blog)
      if(response===200){
        setBlogs(blogs.filter(b => b!==blog))
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      {!user && <LogInForm setUser={setUser} setMessage={setMessage}/>}
      {user && <div>
        <p>{user.username} logged in <button onClick={handleLogOut}>log out</button></p>
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <CreateBlog createNewBlog={createNewBlog}/>
        </Togglable>
        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLike={updateLike} remove={remove}/>)}
        </ul>
      </div>
      }
    </div>
  )
}

export default App