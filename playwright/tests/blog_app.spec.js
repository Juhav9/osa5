const {test, expect, beforeEach, describe} = require('@playwright/test')
const {createBlog, logIn} = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({page , request}) =>{
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http:localhost:3003/api/users', {
            data: {
                name: 'Tester',
                username: 'tester',
                password: 'password'
            }
        })
        await request.post('http:localhost:3003/api/users', {
            data: {
                name: 'Tester2',
                username: 'tester2',
                password: 'password'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('login form is shown', async({page})=> {
        const locator = await page.getByTestId('loginform')
        await expect(locator).toBeVisible()
    })

    describe('Login', () =>{
        test('succeeds with correct credentials', async({page}) => {
            await logIn(page, 'tester', 'password')
            await expect(page.getByText('tester logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await page.getByTestId('username').fill('wrong')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', {name: 'log in'}).click()

            await expect(page.getByText('wrong password or username')).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await logIn(page, 'tester', 'password')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'Test Title', 'Test Author', 'Test Url')

            await expect(page.getByText('Test Title', {exact: true})).toBeVisible()
            await expect(page.getByText('Test Author', {exact: true})).toBeVisible()

            await page.getByRole('button', {name: 'view'}).click()
            await expect(page.getByText('Test Url', {exact: true})).toBeVisible()
        
        })
      })
      describe('when new blog is created', () => {
        beforeEach(async ({ page }) => {
            await logIn(page, 'tester', 'password')
            await createBlog(page, 'Test Title', 'Test Author', 'Test Url')
        })
      
        test('like button adds like', async ({ page }) => {
            await page.getByRole('button', {name: 'view'}).click()
            await expect(page.getByText('likes: 0', {exact: true})).toBeVisible()

            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes: 1', {exact: true})).toBeVisible()
            
        })

        test('blog can be deleted', async ({page}) => {
            await page.getByRole('button', {name: 'view'}).click()
            page.on('dialog', async dialog =>{
                await dialog.accept()
            })
            await page.getByRole('button', {name: 'remove'}).click()
            const locator = await page.getByText('Test Title', {exact: true}).waitFor()
            await expect(locator).toBeUndefined()
        })

        test('remove button is only visible for right user', async({page}) => {
            await page.getByRole('button', {name: 'log out'}).click()

            await logIn(page, 'tester2', 'password')

            await page.getByRole('button', {name: 'view'}).click()

            await expect(page.getByRole('button', {name: 'remove'})).toBeHidden()
        })
        test('blogs are sorted by likes', async({page}) => {
            await createBlog(page, 'Test Title1', 'Test Author1', 'Test Url1')
            await createBlog(page, 'Test Title2', 'Test Author2', 'Test Url2')
            await createBlog(page, 'Test Title2', 'Test Author3', 'Test Url3')
            const buttons = await page.getByRole('button', {name: 'view'}).all()

            let likesArr = []
            for(let i = 0; i<buttons.length; i++){
                await buttons[i].click()
                let likes = Math.floor(Math.random()*10)
                likesArr[i] = likes
                for(let i = 0; i<likes; i++){
                    await page.getByRole('button', {name: 'like'}).click()
                    await page.getByText(`likes: ${i+1}`).waitFor()
                }
                await page.getByRole('button', {name: 'hide'}).click()
            }
            const sortedLikes = likesArr.sort((a,b) => b-a)
            const blogs = await page.getByTestId('blog').all()
            for(let i = 0; i<blogs.length; i++){
                await blogs[i].getByRole('button', {name: 'view'}).click()
                await expect(page.getByText(`likes: ${sortedLikes[i]}`, {exact: true})).toBeVisible()
                await blogs[i].getByRole('button', {name: 'hide'}).click()
            }
            
        })
      })  
})