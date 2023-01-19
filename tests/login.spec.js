const { test, expect } = require('@playwright/test');
const { BasePage } = require('../pages/basePage');
const user = require('../fixtures/user.json')

test.describe('Login test suite', async () => {

    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page)

        await page.goto('/')
        await basePage.makeApointmenButton.click()
    })

    user.forEach((data) => {

        test(`Login with ${data.credential}`, async ({ page }) => {
            const basePage = new BasePage(page)

            await basePage.logInForm(data.username, data.password)
            await expect(page).toHaveURL(data.url);
            if (data.hasError) {
                await expect(basePage.errorMessage).toBeVisible();
            }
        })
    })

})