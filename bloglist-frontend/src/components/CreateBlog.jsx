import { useState } from 'react'

const CreateBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    await createNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        <div>
                    title:
          <input type="text"
            value={title}
            name='Title'
            placeholder='title'
            data-testId='title'
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
                    author:
          <input type="text"
            value={author}
            name='Author'
            placeholder='author'
            data-testId='author'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
                    url:
          <input type="text"
            value={url}
            name='Url'
            placeholder='url'
            data-testId='url'
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default CreateBlog