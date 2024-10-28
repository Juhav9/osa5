import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  console.log(response.data)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const updatedBlog = {
    user:blog.user.id,
    likes:blog.likes,
    author:blog.author,
    title:blog.title,
    url:blog.url
  }
  const url = baseUrl + `/${blog.id}`

  const response = await axios.put(url, updatedBlog, config)
  response.data.user = blog.user
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + `/${blog.id}`
  const response = await axios.delete(url, config)
  return response.status
}

export default { getAll,
  setToken,
  create,
  update,
  remove
}