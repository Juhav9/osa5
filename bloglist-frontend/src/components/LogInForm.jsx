import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LogInForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = async (event) => {
    event.preventDefault()
    try{
      const response = await loginService.login({ username, password })
      window.localStorage.setItem('LoggedUser', JSON.stringify(response))
      blogService.setToken(response.token)
      setUser(response)
    }catch {
      setMessage({ message:'wrong password or username',
        error: 1
      })
      setTimeout(() => {
        setMessage(null)}
      ,3000)
    }
    setUsername('')
    setPassword('')
  }

  return(
    <div data-testId='loginform'>
      <h2>Login</h2>
      <form onSubmit={handleLogIn}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name='Username'
            data-testId='username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password:
          <input
            type="text"
            value={password}
            name='Password'
            data-testId='password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )}

export default LogInForm