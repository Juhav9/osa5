const createBlog = async (page, title, author, url, likes) => {
    await page.getByRole('button', {name: 'new blog'}).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', {name: 'create'}).click()
    await page.getByText(title +' '+ author).waitFor()
}
const logIn = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'log in'}).click()

}
export{createBlog, logIn}