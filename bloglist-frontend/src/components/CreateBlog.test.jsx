import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('form have right content', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<CreateBlog createNewBlog={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const button = screen.getByText('create')

  await user.type(inputTitle, 'new title')
  await user.type(inputAuthor, 'new author')
  await user.type(inputUrl, 'new url')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('new title')
  expect(createBlog.mock.calls[0][0].author).toBe('new author')
  expect(createBlog.mock.calls[0][0].url).toBe('new url')

})