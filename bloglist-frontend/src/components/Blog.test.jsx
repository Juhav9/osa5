import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('render right content', () => {
  const blog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }

  render(<Blog blog={blog}/>)
  screen.getByText('Go To Statement Considered Harmful')
  screen.getByText('Edsger W. Dijkstra')
  const element = screen.queryByText( 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
  expect(element).toBeNull()
})

test('show all fields of blog when show button is pressed', async () => {
  const blog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user:{
      name: 'Tester',
      username: 'tester'
    }
  }

  const container = render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText(blog.url)
  screen.getByText(blog.user.name)
  screen.getByText('likes: ' + blog.likes)
})

test('like button to be clicked twice', async () => {
  const blog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user:{
      name: 'Tester',
      username: 'tester'
    }
  }

  const mockHandler = vi.fn()

  const container = render(<Blog blog={blog}  updateLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.dblClick(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})